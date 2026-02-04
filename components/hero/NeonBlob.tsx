"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import * as THREE from "three"

const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    uniform float uTime;

    void main() {
        vNormal = normalize(normalMatrix * normal);
        vec3 pos = position;
        float wobble = sin(uTime + pos.y * 4.0) * 0.06 + sin(uTime * 1.7 + pos.x * 5.0) * 0.04;
        pos += normal * wobble;
        vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
        vWorldPos = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
`

const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform float uFresnelPower;

    void main() {
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), uFresnelPower);
        float shift = sin(uTime * 0.8 + vWorldPos.y * 2.0 + vWorldPos.x * 1.5) * 0.5 + 0.5;
        vec3 base = mix(uColorA, uColorB, shift);
        base = mix(base, uColorC, pow(fresnel, 1.2));
        vec3 color = base + fresnel * 0.85;
        gl_FragColor = vec4(color, 1.0);
    }
`

function BlobMesh() {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const material = useMemo(
        () =>
            new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uColorA: { value: new THREE.Color("#5ad1ff") },
                    uColorB: { value: new THREE.Color("#7c3aed") },
                    uColorC: { value: new THREE.Color("#22d3ee") },
                    uFresnelPower: { value: 2.4 },
                },
                vertexShader,
                fragmentShader,
            }),
        []
    )

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime()
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = time
        }
        if (!meshRef.current) return
        meshRef.current.rotation.x = time * 0.2
        meshRef.current.rotation.y = time * 0.35
        const pulse = 1 + Math.sin(time * 1.2) * 0.05
        meshRef.current.scale.set(pulse, pulse, pulse)
    })

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[1.2, 5]} />
            <primitive object={material} attach="material" ref={materialRef} />
        </mesh>
    )
}

export default function NeonBlob() {
    return (
        <Canvas
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 4], fov: 45 }}
            onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0)
            }}
            className="w-full h-full"
            style={{
                background: "transparent",
            }}
        >
            <ambientLight intensity={0.4} />
            <pointLight position={[3, 3, 3]} intensity={2.2} color="#7cf5ff" />
            <pointLight position={[-3, -2, -3]} intensity={1.6} color="#8b5cf6" />
            <directionalLight position={[0, 5, 2]} intensity={1.1} color="#ffffff" />
            <BlobMesh />
            <EffectComposer frameBufferType={THREE.HalfFloatType}>
                <Bloom intensity={1.35} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
                <ChromaticAberration blendFunction={BlendFunction.SCREEN} offset={[0.0008, 0.0008]} />
            </EffectComposer>
        </Canvas>
    )
}
