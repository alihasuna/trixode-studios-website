import Link from "next/link"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"

// Connected Hexagon Logo Component
const ConnectedHexagonLogo = ({ size = 24, className = "" }: { size?: number; className?: string }) => {
  const hexagonPoints = []
  const center = size / 2
  const radius = size * 0.35

  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    hexagonPoints.push({ x, y })
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0">
        <polygon
          points={hexagonPoints.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-blue-400"
        />
        {hexagonPoints.map((point, i) => (
          <g key={i}>
            <line
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-blue-400/60"
            />
            <circle cx={point.x} cy={point.y} r="1.5" fill="currentColor" className="text-blue-400" />
          </g>
        ))}
        <circle cx={center} cy={center} r="1.5" fill="currentColor" className="text-blue-400" />
      </svg>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#0a0a1a] border-t border-blue-500/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <ConnectedHexagonLogo size={32} />
              <span className="text-xl font-black text-white">Trixode Studios</span>
            </div>
            <p className="text-gray-400 mb-6 font-medium leading-relaxed max-w-md">
              Building beautiful and elegant software that empowers scientists, innovators, and creators with AI-powered
              tools.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 mb-4">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">Victoria, BC, Canada</span>
            </div>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "https://github.com/trixodestudios", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/trixode-studios-054154311", label: "LinkedIn" },
                { icon: Mail, href: "mailto:ceo@trixode-studios.com", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 rounded-lg flex items-center justify-center hover:from-cyan-500/30 hover:to-blue-600/30 hover:border-cyan-400/50 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-4 w-4 text-cyan-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black text-white mb-6">QUICK LINKS</h3>
            <ul className="space-y-3">
              {[
                { name: "About", href: "/about" },
                { name: "People", href: "/people" },
                { name: "Projects", href: "/projects" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-300 transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-black text-white mb-6">LEGAL</h3>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "Accessibility", href: "/accessibility" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-300 transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-500/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 font-medium">
            © 2025 Trixode-Studios S.A.S. B.I.C. | All rights reserved.
          </p>
          <p className="text-gray-500 font-medium mt-4 md:mt-0">Made with ❤️ in Victoria, BC</p>
        </div>
      </div>
    </footer>
  )
}
