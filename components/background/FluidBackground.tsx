"use client"

import { useEffect, useRef, useCallback } from "react"
import { useTheme } from "next-themes"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReducedMotion } from "framer-motion"

// WebGL Fluid Simulation - Inspired by Pavel Dobryakov's implementation
// Optimized for performance with vibrant neon colors

interface Pointer {
    id: number
    texcoordX: number
    texcoordY: number
    prevTexcoordX: number
    prevTexcoordY: number
    deltaX: number
    deltaY: number
    down: boolean
    moved: boolean
    color: { r: number; g: number; b: number }
}

interface FBO {
    texture: WebGLTexture
    fbo: WebGLFramebuffer
    width: number
    height: number
    texelSizeX: number
    texelSizeY: number
    attach: (id: number) => number
}

interface DoubleFBO {
    width: number
    height: number
    texelSizeX: number
    texelSizeY: number
    read: FBO
    write: FBO
    swap: () => void
}

// Theme-matched palette (derived from site aurora/blob tones)
const DARK_COLORS = [
    { r: 0.26, g: 0.42, b: 0.86 }, // Deep azure
    { r: 0.30, g: 0.46, b: 0.88 }, // Cool blue
    { r: 0.36, g: 0.52, b: 0.90 }, // Soft neon blue
    { r: 0.46, g: 0.56, b: 0.92 }, // Icy periwinkle
    { r: 0.58, g: 0.64, b: 0.94 }, // Misty blue
]

const LIGHT_COLORS = [
    { r: 0.23, g: 0.51, b: 0.96 }, // #3b82f6 - blue (left of gradient)
    { r: 0.45, g: 0.38, b: 0.92 }, // #7361eb - blue-purple blend
    { r: 0.55, g: 0.36, b: 0.96 }, // #8b5cf6 - purple (middle)
    { r: 0.08, g: 0.71, b: 0.83 }, // #14b5d4 - cyan (right of gradient)
    { r: 0.13, g: 0.83, b: 0.93 }, // #22d3ee - bright cyan
]

const getRandomColor = (isDark: boolean) => {
    const palette = isDark ? DARK_COLORS : LIGHT_COLORS
    const base = palette[Math.floor(Math.random() * palette.length)]
    // Deep muted colors for elegant matte appearance
    const intensity = isDark ? 0.35 : 0.6
    return {
        r: base.r * intensity,
        g: base.g * intensity,
        b: base.b * intensity,
    }
}


// Shader sources
const baseVertexShader = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;

  void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`

const clearShader = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;

  void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
  }
`

const displayShaderSource = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec3 uTint;
  uniform float uGain;
  uniform float uAlpha;
  uniform float uClamp;
  uniform float uInvert;

  void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;
    // Boost the dye value
    vec3 dye = c * uGain;
    float a = max(dye.r, max(dye.g, dye.b));
    a = min(a, uClamp);
    
    // Dark Mode (uInvert=0): additive color smoke
    vec3 colorDark = dye * uTint;
    
    // Light Mode (uInvert=1): Show actual dye colors (multicolor gradient effect)
    vec3 colorLight = dye * uTint;
    
    vec3 col = mix(colorDark, colorLight, uInvert);
    gl_FragColor = vec4(col, a * uAlpha);
  }
`

const splatShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;

  void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`

const advectionShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform vec2 dyeTexelSize;
  uniform float dt;
  uniform float dissipation;

  vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
    vec2 st = uv / tsize - 0.5;
    vec2 iuv = floor(st);
    vec2 fuv = fract(st);
    vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
    vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
    vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
    vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
    return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
  }

  void main () {
    vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
    vec4 result = bilerp(uSource, coord, dyeTexelSize);
    float decay = 1.0 + dissipation * dt;
    gl_FragColor = result / decay;
  }
`

const divergenceShader = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;

  void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;
    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) { L = -C.x; }
    if (vR.x > 1.0) { R = -C.x; }
    if (vT.y > 1.0) { T = -C.y; }
    if (vB.y < 0.0) { B = -C.y; }
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`

const curlShader = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;

  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`

const vorticityShader = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;

  void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity += force * dt;
    velocity = min(max(velocity, -1000.0), 1000.0);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`

const pressureShader = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;

  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float C = texture2D(uPressure, vUv).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`

const gradientSubtractShader = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;

  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`

export default function FluidBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const isDesktop = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)")
    const prefersReducedMotion = useReducedMotion()
    const animationRef = useRef<number>(0)
    const glRef = useRef<WebGLRenderingContext | null>(null)
    const { resolvedTheme } = useTheme()
    const themeIsDarkRef = useRef(true)

    // Only render on desktop without reduced motion
    const shouldRender = isDesktop && !prefersReducedMotion

    const initFluid = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return null

        // Configuration
        const config = {
            SIM_RESOLUTION: 128,
            DYE_RESOLUTION: 1024,
            CAPTURE_RESOLUTION: 512,
            DENSITY_DISSIPATION: 3.2,
            VELOCITY_DISSIPATION: 0.75,
            PRESSURE: 0.8,
            PRESSURE_ITERATIONS: 20,
            CURL: 35,
            SPLAT_RADIUS: 0.16,
            SPLAT_FORCE: 1000,
            SHADING: false,
            COLORFUL: true,
            COLOR_UPDATE_SPEED: 10,
            PAUSED: false,
            BACK_COLOR: { r: 0, g: 0, b: 0 },
            TRANSPARENT: true,
        }

        // Get WebGL context
        const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false }
        let gl = canvas.getContext("webgl2", params) as WebGLRenderingContext | null
        let isWebGL2 = !!gl
        if (gl) {
            const gl2 = gl as WebGL2RenderingContext
            const supportsColorBufferFloat = gl2.getExtension("EXT_color_buffer_float")
            if (!supportsColorBufferFloat) {
                gl = null
                isWebGL2 = false
            }
        }
        if (!gl) {
            const fallbackGL = canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params)
            gl = fallbackGL as WebGLRenderingContext | null
        }
        if (!gl) return null

        glRef.current = gl

        // Check for required extensions
        let halfFloatTexType: number
        let formatRGBA: { internalFormat: number; format: number }
        let formatRG: { internalFormat: number; format: number }
        let formatR: { internalFormat: number; format: number }

        if (isWebGL2) {
            const gl2 = gl as WebGL2RenderingContext
            halfFloatTexType = gl2.HALF_FLOAT
            formatRGBA = { internalFormat: gl2.RGBA16F, format: gl2.RGBA }
            formatRG = { internalFormat: gl2.RG16F, format: gl2.RG }
            formatR = { internalFormat: gl2.R16F, format: gl2.RED }
        } else {
            const halfFloat = gl.getExtension("OES_texture_half_float")
            if (!halfFloat) return null
            halfFloatTexType = halfFloat.HALF_FLOAT_OES
            formatRGBA = { internalFormat: gl.RGBA, format: gl.RGBA }
            formatRG = { internalFormat: gl.RGBA, format: gl.RGBA }
            formatR = { internalFormat: gl.RGBA, format: gl.RGBA }
        }

        const supportsLinearFiltering = isWebGL2
            ? !!(gl as WebGL2RenderingContext).getExtension("OES_texture_float_linear")
            : !!gl.getExtension("OES_texture_half_float_linear")
        const filtering = supportsLinearFiltering ? gl.LINEAR : gl.NEAREST

        // Verify that a given format is renderable by testing an actual FBO
        function supportsFBOFormat(intFmt: number, fmt: number, type: number): boolean {
            const tex = gl!.createTexture()
            gl!.bindTexture(gl!.TEXTURE_2D, tex)
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.NEAREST)
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.NEAREST)
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE)
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE)
            gl!.texImage2D(gl!.TEXTURE_2D, 0, intFmt, 4, 4, 0, fmt, type, null)
            const fbo = gl!.createFramebuffer()
            gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo)
            gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0)
            const status = gl!.checkFramebufferStatus(gl!.FRAMEBUFFER)
            gl!.bindFramebuffer(gl!.FRAMEBUFFER, null)
            gl!.deleteFramebuffer(fbo)
            gl!.deleteTexture(tex)
            return status === gl!.FRAMEBUFFER_COMPLETE
        }

        // Fall back RG and R formats to RGBA if the GPU can't render to them
        if (!supportsFBOFormat(formatRG.internalFormat, formatRG.format, halfFloatTexType)) {
            formatRG = { ...formatRGBA }
        }
        if (!supportsFBOFormat(formatR.internalFormat, formatR.format, halfFloatTexType)) {
            formatR = { ...formatRGBA }
        }

        // Resize canvas
        const resizeCanvas = () => {
            const width = window.innerWidth
            const height = window.innerHeight
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width
                canvas.height = height
                return true
            }
            return false
        }
        resizeCanvas()

        // Compile shader
        function compileShader(type: number, source: string): WebGLShader | null {
            const shader = gl!.createShader(type)
            if (!shader) return null
            gl!.shaderSource(shader, source)
            gl!.compileShader(shader)
            if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
                console.error(gl!.getShaderInfoLog(shader))
                return null
            }
            return shader
        }

        // Create program
        function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
            const program = gl!.createProgram()
            if (!program) return null
            gl!.attachShader(program, vertexShader)
            gl!.attachShader(program, fragmentShader)
            gl!.bindAttribLocation(program, 0, "aPosition")
            gl!.linkProgram(program)
            if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
                console.error(gl!.getProgramInfoLog(program))
                return null
            }
            return program
        }

        // Get uniforms
        function getUniforms(program: WebGLProgram): Record<string, WebGLUniformLocation> {
            const uniforms: Record<string, WebGLUniformLocation> = {}
            const uniformCount = gl!.getProgramParameter(program, gl!.ACTIVE_UNIFORMS)
            for (let i = 0; i < uniformCount; i++) {
                const uniformName = gl!.getActiveUniform(program, i)?.name
                if (uniformName) {
                    const loc = gl!.getUniformLocation(program, uniformName)
                    if (loc !== null) uniforms[uniformName] = loc
                }
            }
            return uniforms
        }

        // Create shader program wrapper
        class Program {
            uniforms: Record<string, WebGLUniformLocation>
            program: WebGLProgram

            constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
                this.program = createProgram(vertexShader, fragmentShader)!
                this.uniforms = getUniforms(this.program)
            }

            bind() {
                gl!.useProgram(this.program)
            }
        }

        // Compile all shaders
        const baseVertex = compileShader(gl.VERTEX_SHADER, baseVertexShader)!

        const clearProgram = new Program(baseVertex, compileShader(gl.FRAGMENT_SHADER, clearShader)!)
        const splatProgram = new Program(baseVertex, compileShader(gl.FRAGMENT_SHADER, splatShader)!)
        const advectionProgram = new Program(baseVertex, compileShader(gl.FRAGMENT_SHADER, advectionShader)!)
        const divergenceProgram = new Program(baseVertex, compileShader(gl.FRAGMENT_SHADER, divergenceShader)!)
        const curlProgram = new Program(baseVertex, compileShader(gl.FRAGMENT_SHADER, curlShader)!)
        const vorticityProgram = new Program(baseVertex, compileShader(gl.FRAGMENT_SHADER, vorticityShader)!)
        const pressureProgram = new Program(baseVertex, compileShader(gl.FRAGMENT_SHADER, pressureShader)!)
        const gradientSubtractProgram = new Program(baseVertex, compileShader(gl.FRAGMENT_SHADER, gradientSubtractShader)!)
        const displayProgram = new Program(baseVertex, compileShader(gl.FRAGMENT_SHADER, displayShaderSource)!)

        // Create vertex buffer (single quad for all full-screen passes)
        const vertexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW)

        const indexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW)

        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(0)

        function blit(target: FBO | null, clear = false) {
            if (target == null) {
                gl!.viewport(0, 0, gl!.drawingBufferWidth, gl!.drawingBufferHeight)
                gl!.bindFramebuffer(gl!.FRAMEBUFFER, null)
            } else {
                gl!.viewport(0, 0, target.width, target.height)
                gl!.bindFramebuffer(gl!.FRAMEBUFFER, target.fbo)
            }
            if (clear) {
                gl!.clearColor(0.0, 0.0, 0.0, 0.0)
                gl!.clear(gl!.COLOR_BUFFER_BIT)
            }
            // Rebind geometry in case external code changed buffer state
            gl!.bindBuffer(gl!.ARRAY_BUFFER, vertexBuffer)
            gl!.bindBuffer(gl!.ELEMENT_ARRAY_BUFFER, indexBuffer)
            gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, 0, 0)
            gl!.enableVertexAttribArray(0)
            gl!.drawElements(gl!.TRIANGLES, 6, gl!.UNSIGNED_SHORT, 0)
        }

        // Create FBO
        function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {
            gl!.activeTexture(gl!.TEXTURE0)
            const texture = gl!.createTexture()!
            gl!.bindTexture(gl!.TEXTURE_2D, texture)
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, param)
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, param)
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE)
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE)
            gl!.texImage2D(gl!.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null)

            const fbo = gl!.createFramebuffer()!
            gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo)
            gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, texture, 0)
            gl!.viewport(0, 0, w, h)
            gl!.clear(gl!.COLOR_BUFFER_BIT)

            const texelSizeX = 1.0 / w
            const texelSizeY = 1.0 / h

            return {
                texture,
                fbo,
                width: w,
                height: h,
                texelSizeX,
                texelSizeY,
                attach(id: number) {
                    gl!.activeTexture(gl!.TEXTURE0 + id)
                    gl!.bindTexture(gl!.TEXTURE_2D, texture)
                    return id
                },
            }
        }

        // Create double FBO for ping-pong rendering
        function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): DoubleFBO {
            let fbo1 = createFBO(w, h, internalFormat, format, type, param)
            let fbo2 = createFBO(w, h, internalFormat, format, type, param)

            return {
                width: w,
                height: h,
                texelSizeX: fbo1.texelSizeX,
                texelSizeY: fbo1.texelSizeY,
                get read() {
                    return fbo1
                },
                set read(value) {
                    fbo1 = value
                },
                get write() {
                    return fbo2
                },
                set write(value) {
                    fbo2 = value
                },
                swap() {
                    const temp = fbo1
                    fbo1 = fbo2
                    fbo2 = temp
                },
            }
        }

        // Get resolution
        function getResolution(resolution: number) {
            let aspectRatio = gl!.drawingBufferWidth / gl!.drawingBufferHeight
            if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio
            const min = Math.round(resolution)
            const max = Math.round(resolution * aspectRatio)
            if (gl!.drawingBufferWidth > gl!.drawingBufferHeight) return { width: max, height: min }
            else return { width: min, height: max }
        }

        // Initialize FBOs
        const simRes = getResolution(config.SIM_RESOLUTION)
        const dyeRes = getResolution(config.DYE_RESOLUTION)

        let dye = createDoubleFBO(dyeRes.width, dyeRes.height, formatRGBA.internalFormat, formatRGBA.format, halfFloatTexType, filtering)
        let velocity = createDoubleFBO(simRes.width, simRes.height, formatRG.internalFormat, formatRG.format, halfFloatTexType, filtering)
        let divergence = createFBO(simRes.width, simRes.height, formatR.internalFormat, formatR.format, halfFloatTexType, gl.NEAREST)
        let curl = createFBO(simRes.width, simRes.height, formatR.internalFormat, formatR.format, halfFloatTexType, gl.NEAREST)
        let pressure = createDoubleFBO(simRes.width, simRes.height, formatR.internalFormat, formatR.format, halfFloatTexType, gl.NEAREST)

        // Pointers for interaction
        const pointers: Pointer[] = []
        pointers.push({
            id: -1,
            texcoordX: 0,
            texcoordY: 0,
            prevTexcoordX: 0,
            prevTexcoordY: 0,
            deltaX: 0,
            deltaY: 0,
            down: false,
            moved: false,
            color: getRandomColor(themeIsDarkRef.current),
        })

        // Handle resize
        function initFramebuffers() {
            const simRes = getResolution(config.SIM_RESOLUTION)
            const dyeRes = getResolution(config.DYE_RESOLUTION)

            dye = createDoubleFBO(dyeRes.width, dyeRes.height, formatRGBA.internalFormat, formatRGBA.format, halfFloatTexType, filtering)
            velocity = createDoubleFBO(simRes.width, simRes.height, formatRG.internalFormat, formatRG.format, halfFloatTexType, filtering)
            divergence = createFBO(simRes.width, simRes.height, formatR.internalFormat, formatR.format, halfFloatTexType, gl!.NEAREST)
            curl = createFBO(simRes.width, simRes.height, formatR.internalFormat, formatR.format, halfFloatTexType, gl!.NEAREST)
            pressure = createDoubleFBO(simRes.width, simRes.height, formatR.internalFormat, formatR.format, halfFloatTexType, gl!.NEAREST)
        }

        // Splat function - adds color and velocity at a point
        function splat(x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) {
            splatProgram.bind()
            gl!.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0))
            gl!.uniform1f(splatProgram.uniforms.aspectRatio, canvas!.width / canvas!.height)
            gl!.uniform2f(splatProgram.uniforms.point, x, y)
            gl!.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0)
            gl!.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0))
            blit(velocity.write)
            velocity.swap()

            gl!.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0))
            gl!.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b)
            blit(dye.write)
            dye.swap()
        }

        function correctRadius(radius: number) {
            const aspectRatio = canvas!.width / canvas!.height
            if (aspectRatio > 1) radius *= aspectRatio
            return radius
        }

        // Simulation step
        function step(dt: number) {
            gl!.disable(gl!.BLEND)

            // Curl
            curlProgram.bind()
            gl!.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
            gl!.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0))
            blit(curl)

            // Vorticity
            vorticityProgram.bind()
            gl!.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
            gl!.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0))
            gl!.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1))
            gl!.uniform1f(vorticityProgram.uniforms.curl, config.CURL)
            gl!.uniform1f(vorticityProgram.uniforms.dt, dt)
            blit(velocity.write)
            velocity.swap()

            // Divergence
            divergenceProgram.bind()
            gl!.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
            gl!.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0))
            blit(divergence)

            // Clear pressure
            clearProgram.bind()
            gl!.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0))
            gl!.uniform1f(clearProgram.uniforms.value, config.PRESSURE)
            blit(pressure.write)
            pressure.swap()

            // Pressure solve
            pressureProgram.bind()
            gl!.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
            gl!.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0))
            for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
                gl!.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1))
                blit(pressure.write)
                pressure.swap()
            }

            // Gradient subtract
            gradientSubtractProgram.bind()
            gl!.uniform2f(gradientSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
            gl!.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read.attach(0))
            gl!.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.attach(1))
            blit(velocity.write)
            velocity.swap()

            // Advect velocity
            advectionProgram.bind()
            gl!.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
            gl!.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY)
            gl!.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0))
            gl!.uniform1i(advectionProgram.uniforms.uSource, velocity.read.attach(0))
            gl!.uniform1f(advectionProgram.uniforms.dt, dt)
            gl!.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION)
            blit(velocity.write)
            velocity.swap()

            // Advect dye
            gl!.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY)
            gl!.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1))
            gl!.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION)
            blit(dye.write)
            dye.swap()
        }

        // Render to screen
        function render() {
            gl!.enable(gl!.BLEND)
            const isDarkTheme = themeIsDarkRef.current
            if (isDarkTheme) {
                // Additive blend for bright smoke on dark background
                gl!.blendFunc(gl!.ONE, gl!.ONE_MINUS_SRC_ALPHA)
            } else {
                // Standard alpha blend for dark smoke on light background
                gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE_MINUS_SRC_ALPHA)
            }

            displayProgram.bind()
            gl!.uniform1i(displayProgram.uniforms.uTexture, dye.read.attach(0))
            if (isDarkTheme) {
                gl!.uniform3f(displayProgram.uniforms.uTint, 1.0, 1.0, 1.0)
                gl!.uniform1f(displayProgram.uniforms.uGain, 0.7)
                gl!.uniform1f(displayProgram.uniforms.uAlpha, 0.18)
                gl!.uniform1f(displayProgram.uniforms.uClamp, 1.0)
                gl!.uniform1f(displayProgram.uniforms.uInvert, 0.0)
            } else {
                // Deep rich matte - no white at all, deep saturated colors
                gl!.uniform3f(displayProgram.uniforms.uTint, 0.25, 0.28, 0.38)
                gl!.uniform1f(displayProgram.uniforms.uGain, 0.4)
                gl!.uniform1f(displayProgram.uniforms.uAlpha, 0.70)
                gl!.uniform1f(displayProgram.uniforms.uClamp, 0.35)
                gl!.uniform1f(displayProgram.uniforms.uInvert, 1.0)
            }
            blit(null, true)
        }

        // Update pointers
        function updatePointerMoveData(pointer: Pointer, posX: number, posY: number) {
            pointer.prevTexcoordX = pointer.texcoordX
            pointer.prevTexcoordY = pointer.texcoordY
            pointer.texcoordX = posX / canvas!.width
            pointer.texcoordY = 1.0 - posY / canvas!.height
            pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX)
            pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY)
            pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0
        }

        function correctDeltaX(delta: number) {
            const aspectRatio = canvas!.width / canvas!.height
            if (aspectRatio < 1) delta *= aspectRatio
            return delta
        }

        function correctDeltaY(delta: number) {
            const aspectRatio = canvas!.width / canvas!.height
            if (aspectRatio > 1) delta /= aspectRatio
            return delta
        }

        // Input handlers - use window events so they work even with content overlay
        function onMouseMove(e: MouseEvent) {
            const pointer = pointers[0]
            if (!pointer.down) return // Only create smoke while mouse is down
            updatePointerMoveData(pointer, e.clientX, e.clientY)
        }

        function onMouseDown(e: MouseEvent) {
            const pointer = pointers[0]
            updatePointerMoveData(pointer, e.clientX, e.clientY)
            pointer.down = true
            pointer.moved = true // Trigger initial splat on click
            pointer.color = getRandomColor(themeIsDarkRef.current)
        }

        function onMouseUp() {
            pointers[0].down = false
        }

        function onTouchStart(e: TouchEvent) {
            e.preventDefault()
            const touches = e.targetTouches
            while (pointers.length < touches.length) {
                pointers.push({
                    id: -1,
                    texcoordX: 0,
                    texcoordY: 0,
                    prevTexcoordX: 0,
                    prevTexcoordY: 0,
                    deltaX: 0,
                    deltaY: 0,
                    down: false,
                    moved: false,
                    color: getRandomColor(themeIsDarkRef.current),
                })
            }
            for (let i = 0; i < touches.length; i++) {
                const rect = canvas!.getBoundingClientRect()
                pointers[i].id = touches[i].identifier
                pointers[i].down = true
                pointers[i].color = getRandomColor(themeIsDarkRef.current)
                updatePointerMoveData(pointers[i], touches[i].pageX - rect.left, touches[i].pageY - rect.top)
            }
        }

        function onTouchMove(e: TouchEvent) {
            e.preventDefault()
            const touches = e.targetTouches
            for (let i = 0; i < touches.length; i++) {
                const pointer = pointers.find((p) => p.id === touches[i].identifier)
                if (pointer) {
                    const rect = canvas!.getBoundingClientRect()
                    updatePointerMoveData(pointer, touches[i].pageX - rect.left, touches[i].pageY - rect.top)
                }
            }
        }

        function onTouchEnd(e: TouchEvent) {
            const touches = e.changedTouches
            for (let i = 0; i < touches.length; i++) {
                const pointer = pointers.find((p) => p.id === touches[i].identifier)
                if (pointer) {
                    pointer.down = false
                }
            }
        }

        // Attach event listeners to window so they work with content overlay
        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("mousedown", onMouseDown)
        window.addEventListener("mouseup", onMouseUp)
        window.addEventListener("touchstart", onTouchStart, { passive: false })
        window.addEventListener("touchmove", onTouchMove, { passive: false })
        window.addEventListener("touchend", onTouchEnd)

        // Handle resize
        function handleResize() {
            if (resizeCanvas()) {
                initFramebuffers()
            }
        }
        window.addEventListener("resize", handleResize)

        // Animation loop
        let lastUpdateTime = Date.now()

        function update() {
            const now = Date.now()
            let dt = (now - lastUpdateTime) / 1000
            dt = Math.min(dt, 0.016666)
            lastUpdateTime = now

            // Apply input
            for (const pointer of pointers) {
                if (pointer.moved) {
                    pointer.moved = false
                    const dx = pointer.deltaX * config.SPLAT_FORCE
                    const dy = pointer.deltaY * config.SPLAT_FORCE
                    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color)
                }
            }

            step(dt)
            render()

            animationRef.current = requestAnimationFrame(update)
        }

        // Start
        update()

        // Cleanup function
        return () => {
            cancelAnimationFrame(animationRef.current)
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("mousedown", onMouseDown)
            window.removeEventListener("mouseup", onMouseUp)
            window.removeEventListener("touchstart", onTouchStart)
            window.removeEventListener("touchmove", onTouchMove)
            window.removeEventListener("touchend", onTouchEnd)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    useEffect(() => {
        if (!shouldRender) return

        const cleanup = initFluid()
        return cleanup ?? undefined
    }, [shouldRender, initFluid])

    useEffect(() => {
        if (resolvedTheme === "light") {
            themeIsDarkRef.current = false
            return
        }

        if (resolvedTheme === "dark") {
            themeIsDarkRef.current = true
            return
        }

        themeIsDarkRef.current = document.documentElement.classList.contains("dark")
    }, [resolvedTheme])

    if (!shouldRender) {
        return null
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{
                background: "transparent",
            }}
        />
    )
}
