"use client"

import { use } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"

import { blogPostMap } from "@/app/blog/blogData"
import Footer from "@/components/footer"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const post = blogPostMap[resolvedParams.slug]

  if (!post) {
    notFound()
  }

  useMagneticEffect()

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
        <div className="max-w-5xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/blog"
              className="magnetic inline-flex items-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-medium group"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6">
              <span className="text-brand-blue text-xs font-medium uppercase tracking-widest border border-brand-blue/20 bg-brand-blue/5 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 text-black dark:text-white leading-tight font-grotesk">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-black/40 dark:text-white/40 font-light">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.article
            className="prose prose-invert prose-xl max-w-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 md:p-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                color: "#e5e7eb",
                lineHeight: "1.8",
                fontSize: "1.1rem",
              }}
            />
            <style jsx global>{`
              /* Enhanced Typography */
              .prose h2 {
                color: #ffffff !important;
                font-weight: 800 !important;
                font-size: 1.75rem !important;
                margin: 2.5rem 0 1.5rem 0 !important;
                padding-bottom: 0.5rem !important;
                border-bottom: 2px solid #3b82f6 !important;
              }
              
              .prose h3 {
                color: #60a5fa !important;
                font-weight: 700 !important;
                font-size: 1.4rem !important;
                margin: 2rem 0 1rem 0 !important;
              }
              
              .prose h4 {
                color: #93c5fd !important;
                font-weight: 600 !important;
                font-size: 1.2rem !important;
                margin: 1.5rem 0 0.75rem 0 !important;
              }
              
              /* Improved Paragraphs */
              .prose p {
                color: #e5e7eb !important;
                margin: 1.5rem 0 !important;
                text-align: left !important;
                max-width: none !important;
              }
              
              /* Better Lists */
              .prose ul, .prose ol {
                margin: 1.5rem 0 !important;
                padding-left: 1.5rem !important;
              }
              
              .prose li {
                color: #d1d5db !important;
                margin: 0.75rem 0 !important;
                line-height: 1.7 !important;
              }
              
              .prose li::marker {
                color: #60a5fa !important;
              }
              
              /* Enhanced Code Blocks */
              .prose pre {
                background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9)) !important;
                border: 1px solid rgba(59, 130, 246, 0.3) !important;
                border-radius: 12px !important;
                padding: 1.5rem !important;
                margin: 2rem 0 !important;
                overflow-x: auto !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
              }
              
              .prose code {
                background: rgba(59, 130, 246, 0.1) !important;
                color: #93c5fd !important;
                padding: 0.25rem 0.5rem !important;
                border-radius: 6px !important;
                font-size: 0.9em !important;
                font-weight: 500 !important;
                border: 1px solid rgba(59, 130, 246, 0.2) !important;
              }
              
              .prose pre code {
                background: transparent !important;
                color: #e2e8f0 !important;
                padding: 0 !important;
                border: none !important;
                font-size: 0.95rem !important;
              }
              
              /* Strong Text */
              .prose strong {
                color: #ffffff !important;
                font-weight: 700 !important;
              }
              
              /* Emphasis */
              .prose em {
                color: #fbbf24 !important;
                font-style: italic !important;
              }
              
              /* Better Spacing */
              .prose > * {
                max-width: none !important;
              }
              
              /* Links */
              .prose a {
                color: #60a5fa !important;
                text-decoration: underline !important;
                text-decoration-color: rgba(96, 165, 250, 0.5) !important;
                transition: all 0.2s ease !important;
              }
              
              .prose a:hover {
                color: #93c5fd !important;
                text-decoration-color: #93c5fd !important;
              }
              
              /* Blockquotes */
              .prose blockquote {
                border-left: 4px solid #3b82f6 !important;
                background: rgba(59, 130, 246, 0.05) !important;
                padding: 1rem 1.5rem !important;
                margin: 2rem 0 !important;
                font-style: italic !important;
                color: #d1d5db !important;
              }
              
              /* Tables */
              .prose table {
                width: 100% !important;
                border-collapse: collapse !important;
                margin: 2rem 0 !important;
              }
              
              .prose th, .prose td {
                border: 1px solid rgba(59, 130, 246, 0.3) !important;
                padding: 0.75rem !important;
                text-align: left !important;
              }
              
              .prose th {
                background: rgba(59, 130, 246, 0.1) !important;
                color: #ffffff !important;
                font-weight: 600 !important;
              }
              
              .prose td {
                color: #e5e7eb !important;
              }
            `}</style>
          </motion.article>

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <motion.section
              className="mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl font-black mb-8 text-black dark:text-white">RELATED POSTS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {post.relatedPosts.map((relatedPost, index) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 hover:border-blue-400/40 transition-all duration-300"
                  >
                    <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center text-cyan-300 font-semibold text-sm">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
