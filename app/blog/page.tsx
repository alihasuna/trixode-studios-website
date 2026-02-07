"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, ArrowRight, BookOpen, Mail, CheckCircle, AlertCircle } from "lucide-react"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import Footer from "@/components/footer"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"
import { useState } from "react"

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Research Tools",
    category: "AI & Research",
    date: "2024-01-15",
    excerpt:
      "Exploring how artificial intelligence is revolutionizing the way researchers approach complex problems and data analysis.",
    readTime: "5 min read",
    slug: "future-of-ai-research-tools",
  },
  {
    id: 2,
    title: "Building Elegant Software Architecture",
    category: "Software Dev",
    date: "2024-01-10",
    excerpt:
      "A deep dive into the principles of creating maintainable, scalable, and beautiful code that stands the test of time.",
    readTime: "8 min read",
    slug: "building-elegant-software-architecture",
  },
  {
    id: 3,
    title: "Bridging Academia and Industry",
    category: "Research Impact",
    date: "2024-01-05",
    excerpt: "How we're working to close the gap between cutting-edge research and practical, real-world applications.",
    readTime: "6 min read",
    slug: "bridging-academia-industry",
  },
  {
    id: 4,
    title: "Quantum Computing and Software Design",
    category: "Quantum Tech",
    date: "2023-12-28",
    excerpt: "Exploring the intersection of quantum computing principles and modern software architecture patterns.",
    readTime: "7 min read",
    slug: "quantum-computing-software-design",
  },
  {
    id: 5,
    title: "Open Source and Research Collaboration",
    category: "Open Source",
    date: "2023-12-20",
    excerpt:
      "The importance of open-source software in advancing scientific research and fostering global collaboration.",
    readTime: "5 min read",
    slug: "open-source-research-collaboration",
  },
  {
    id: 6,
    title: "Performance Optimization for AI Tools",
    category: "Performance",
    date: "2023-12-15",
    excerpt: "Technical strategies for building fast, responsive AI-powered applications that scale with user demand.",
    readTime: "10 min read",
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
  useMagneticEffect()

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
    <div className="min-h-screen bg-white dark:bg-[#030303] text-black dark:text-white overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Background Aurora Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute w-[600px] h-[600px] -top-20 -left-20 rounded-full blur-[100px] opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] top-1/3 -right-10 rounded-full blur-[100px] opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bottom-0 left-1/3 rounded-full blur-[100px] opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="pt-32 pb-20 relative z-10">
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
              className="magnetic inline-flex items-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-medium group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-light mb-16 text-black dark:text-white font-grotesk"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Updates &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black dark:from-white to-black/50 dark:to-white/50">Insights</span>
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
                  className={`magnetic px-6 py-3 font-medium text-sm rounded-full transition-all duration-300 border ${selectedCategory === category
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "bg-black/[0.03] dark:bg-white/[0.03] text-black/70 dark:text-white/70 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:text-black dark:hover:text-white"
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
            <p className="text-black/40 dark:text-white/40 font-medium text-sm">
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
                className="block h-full"
              >
                <motion.article
                  className="group glass p-8 rounded-3xl h-full flex flex-col justify-between hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-500 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div>
                    {/* Category & Date */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-brand-blue text-xs font-medium uppercase tracking-widest border border-brand-blue/20 bg-brand-blue/5 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center text-black/40 dark:text-white/40 text-xs font-medium">
                        <Calendar className="h-3 w-3 mr-2" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-medium mb-4 leading-tight text-black dark:text-white group-hover:text-brand-blue transition-colors font-grotesk">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-black/60 dark:text-white/60 mb-8 leading-relaxed font-light text-sm line-clamp-3">{post.excerpt}</p>
                  </div>

                  {/* Read More */}
                  <div className="flex items-center justify-between pt-6 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center text-black/40 dark:text-white/40 text-xs font-medium">
                      <BookOpen className="h-3 w-3 mr-2" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center text-black dark:text-white font-medium text-sm group-hover:translate-x-1 transition-transform">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>

          {/* No Posts Message */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-black/40 dark:text-white/40 font-light">
                No posts found in "{selectedCategory}" category.
              </p>
            </motion.div>
          )}

          {/* Newsletter Signup */}
          <motion.section
            className="mt-32"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="glass p-12 lg:p-16 rounded-3xl border border-black/5 dark:border-white/5 relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-black/10 dark:border-white/10">
                  <Mail className="h-8 w-8 text-black dark:text-white" />
                </div>

                <h2 className="text-4xl font-light mb-6 text-black dark:text-white font-grotesk">Stay Updated</h2>
                <p className="text-lg text-black/60 dark:text-white/60 mb-10 font-light">
                  Get the latest insights on AI, software development, and research impact delivered to your inbox.
                </p>

                {subscriptionStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <p className="text-green-300 font-medium">
                      Successfully subscribed!
                    </p>
                  </motion.div>
                )}

                {subscriptionStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <p className="text-red-300 font-medium">
                      Something went wrong. Please try again.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-6 py-4 bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 rounded-full focus:border-brand-blue focus:outline-none transition-all duration-300"
                    required
                    disabled={isSubscribing}
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing || !email}
                    className="magnetic bg-black dark:bg-white text-white dark:text-black font-medium px-8 py-4 rounded-full transition-all duration-300 hover:bg-black/90 dark:hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isSubscribing ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
