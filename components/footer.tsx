import Link from "next/link"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import { HexagonLogo } from "@/components/ui/HexagonLogo"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#030303] border-t border-black/10 dark:border-white/10 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] dark:via-white/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <HexagonLogo size={32} />
              <span className="text-xl font-medium text-black dark:text-white font-grotesk">Trixode Studios</span>
            </div>
            <p className="text-black/60 dark:text-white/60 mb-6 font-light leading-relaxed max-w-md">
              Building beautiful and elegant software that empowers scientists, innovators, and creators with AI-powered
              tools.
            </p>
            <div className="flex items-center space-x-2 text-black/50 dark:text-white/50 mb-4">
              <MapPin className="h-4 w-4" />
              <span className="font-light">Victoria, BC, Canada</span>
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
                  aria-label={social.label}
                  className="w-10 h-10 bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-lg flex items-center justify-center hover:bg-black/[0.08] dark:hover:bg-white/[0.08] hover:border-black/30 dark:hover:border-white/30 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-4 w-4 text-black/70 dark:text-white/70" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-black/60 dark:text-white/60 mb-6 font-medium">Quick Links</h3>
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
                    className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-black/60 dark:text-white/60 mb-6 font-medium">Legal</h3>
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
                    className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/10 dark:border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-black/50 dark:text-white/50 font-light">
            © 2026 Trixode-Studios S.A.S. B.I.C. | All rights reserved.
          </p>
          <p className="text-black/30 dark:text-white/30 font-light">Made with ❤️ in Victoria, BC</p>
        </div>
      </div>
    </footer>
  )
}
