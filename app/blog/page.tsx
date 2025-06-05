"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react"
import MobileMenu from "@/components/mobile-menu"
import CursorEffect from "@/components/cursor-effect"
import { useState } from "react"

// Connected Hexagon Logo Component
const ConnectedHexagonLogo = ({ size = 32, className = "" }: { size?: number; className?: string }) => {
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
            <circle cx={point.x} cy={point.y} r="2" fill="currentColor" className="text-blue-400" />
          </g>
        ))}
        <circle cx={center} cy={center} r="2" fill="currentColor" className="text-blue-400" />
      </svg>
    </div>
  )
}

const blogPosts = [
  {
    id: 1,
    title: "THE FUTURE OF AI IN RESEARCH TOOLS",
    category: "AI & Research",
    date: "2024-01-15",
    excerpt:
      "Exploring how artificial intelligence is revolutionizing the way researchers approach complex problems and data analysis.",
    readTime: "5 min read",
    gradient: "from-blue-600 to-blue-800",
    slug: "future-of-ai-research-tools",
  },
  {
    id: 2,
    title: "BUILDING ELEGANT SOFTWARE ARCHITECTURE",
    category: "Software Dev",
    date: "2024-01-10",
    excerpt:
      "A deep dive into the principles of creating maintainable, scalable, and beautiful code that stands the test of time.",
    readTime: "8 min read",
    gradient: "from-blue-600 to-purple-700",
    slug: "building-elegant-software-architecture",
  },
  {
    id: 3,
    title: "BRIDGING ACADEMIA AND INDUSTRY",
    category: "Research Impact",
    date: "2024-01-05",
    excerpt: "How we're working to close the gap between cutting-edge research and practical, real-world applications.",
    readTime: "6 min read",
    gradient: "from-purple-700 to-pink-600",
    slug: "bridging-academia-industry",
  },
  {
    id: 4,
    title: "QUANTUM COMPUTING AND SOFTWARE DESIGN",
    category: "Quantum Tech",
    date: "2023-12-28",
    excerpt: "Exploring the intersection of quantum computing principles and modern software architecture patterns.",
    readTime: "7 min read",
    gradient: "from-indigo-600 to-purple-700",
    slug: "quantum-computing-software-design",
  },
  {
    id: 5,
    title: "OPEN SOURCE AND RESEARCH COLLABORATION",
    category: "Open Source",
    date: "2023-12-20",
    excerpt:
      "The importance of open-source software in advancing scientific research and fostering global collaboration.",
    readTime: "5 min read",
    gradient: "from-blue-600 to-blue-700",
    slug: "open-source-research-collaboration",
  },
  {
    id: 6,
    title: "PERFORMANCE OPTIMIZATION FOR AI TOOLS",
    category: "Performance",
    date: "2023-12-15",
    excerpt: "Technical strategies for building fast, responsive AI-powered applications that scale with user demand.",
    readTime: "10 min read",
    gradient: "from-blue-800 to-blue-600",
    slug: "performance-optimization-ai-tools",
  },
]

const categories = [
  "All",
  "AI & Research",
  "Software Dev",
  "Research Impact",
  "Quantum Tech",
  "Open Source",
  "Performance",
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "error">("idle")

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return

    setIsSubscribing(true)
    setSubscriptionStatus("idle")

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubscriptionStatus("success")
        setEmail("")
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubscriptionStatus("idle")
        }, 5000)
      } else {
        setSubscriptionStatus("error")
        setTimeout(() => {
          setSubscriptionStatus("idle")
        }, 5000)
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setSubscriptionStatus("error")
      setTimeout(() => {
        setSubscriptionStatus("idle")
      }, 5000)
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Cursor Effect */}
      <CursorEffect />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/15 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-blue-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <ConnectedHexagonLogo size={32} />
              <span className="text-xl font-black text-white">Trixode Studios</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {["People", "About", "Projects"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
                >
                  {item}
                </Link>
              ))}
              <Link href="/blog" className="text-cyan-400 font-black">
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu */}
            <MobileMenu currentPath="/blog" />
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-16 text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            BLOG &
            <br />
            UPDATES
          </motion.h1>

          {/* Category Filter */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-3 font-black text-sm rounded-xl transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25"
                      : "bg-blue-900/20 text-gray-300 border border-cyan-500/20 hover:bg-blue-800/30 hover:border-cyan-400/40 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Posts Count */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400 font-semibold">
              Showing {filteredPosts.length} posts
              {selectedCategory !== "All" && ` in "${selectedCategory}"`}
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block"
              >
                <motion.article
                  className="group bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl overflow-hidden hover:border-blue-400/40 transition-all duration-500 cursor-pointer h-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                  layout
              >
                {/* Thumbnail */}
                <div className={`h-48 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                        <span className="text-2xl font-black text-white">{post.id}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-3 py-1 text-xs font-black rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-black mb-3 leading-tight text-white group-hover:text-cyan-300 transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-400 mb-4 leading-relaxed font-semibold">{post.excerpt}</p>

                  {/* Read More */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-semibold">{post.readTime}</span>
                    <div className="flex items-center text-cyan-300 font-black text-sm group-hover:text-cyan-200 transition-colors">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.article>
              </Link>
            ))}
          </div>

          {/* No Posts Message */}
          {filteredPosts.length === 0 && (
          <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
          >
              <p className="text-xl text-gray-400 font-semibold">
                No posts found in "{selectedCategory}" category.
              </p>
          </motion.div>
          )}

          {/* Newsletter Signup */}
          <motion.section
            className="mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-12">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl font-black mb-6 text-white">STAY UPDATED</h2>
                <p className="text-xl text-gray-300 mb-8 font-semibold">
                  Get the latest insights on AI, software development, and research impact delivered to your inbox.
                </p>
                
                {subscriptionStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-xl"
                  >
                    <p className="text-green-400 font-semibold">
                      🎉 Successfully subscribed! Check your email for confirmation.
                    </p>
                  </motion.div>
                )}

                {subscriptionStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl"
                  >
                    <p className="text-red-400 font-semibold">
                      ❌ Something went wrong. Please try again.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-6 py-4 bg-blue-900/20 border border-cyan-500/30 text-white placeholder-gray-400 rounded-xl focus:border-cyan-400 focus:outline-none transition-all duration-300 font-semibold"
                    required
                    disabled={isSubscribing}
                  />
                  <button 
                    type="submit"
                    disabled={isSubscribing || !email}
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-black px-8 py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
