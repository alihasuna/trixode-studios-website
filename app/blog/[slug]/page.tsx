"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"
import Footer from "@/components/footer"
import MobileMenu from "@/components/mobile-menu"

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

// Blog posts data
const blogPosts = {
  "future-of-ai-research-tools": {
    id: 1,
    title: "The Future of AI in Research Tools",
    category: "AI & Research",
    date: "2024-01-15",
    readTime: "5 min read",
    author: "Hussien Ballouk",
    excerpt:
      "Exploring how artificial intelligence is revolutionizing the way researchers approach complex problems and data analysis.",
    content: `
      <p>Artificial Intelligence is fundamentally transforming the landscape of research tools, creating unprecedented opportunities for scientists, academics, and innovators worldwide. As we stand at the intersection of computational power and human curiosity, we're witnessing a revolution that promises to accelerate discovery and democratize access to sophisticated analytical capabilities.</p>

      <h2>The Current State of AI in Research</h2>
      <p>Today's research environment is characterized by an explosion of data and increasingly complex problems that require sophisticated analytical approaches. Traditional research methods, while foundational, often struggle to keep pace with the volume and complexity of modern datasets. This is where AI steps in as a force multiplier, enabling researchers to:</p>
      
      <ul>
        <li>Process vast amounts of data in real-time</li>
        <li>Identify patterns that would be impossible to detect manually</li>
        <li>Generate hypotheses based on comprehensive data analysis</li>
        <li>Automate repetitive tasks to focus on creative problem-solving</li>
      </ul>

      <h2>Emerging Trends and Technologies</h2>
      <p>Several key trends are shaping the future of AI-powered research tools:</p>

      <h3>1. Natural Language Processing for Literature Review</h3>
      <p>Advanced NLP models are revolutionizing how researchers conduct literature reviews. These tools can analyze thousands of papers in minutes, extracting key insights, identifying research gaps, and suggesting relevant connections between studies.</p>

      <h3>2. Automated Hypothesis Generation</h3>
      <p>AI systems are becoming capable of generating novel hypotheses by analyzing existing research and identifying unexplored connections. This capability is particularly powerful in interdisciplinary research where insights from one field can inform another.</p>

      <h3>3. Intelligent Data Visualization</h3>
      <p>Modern AI tools can automatically generate meaningful visualizations based on data characteristics and research objectives, helping researchers communicate their findings more effectively.</p>

      <h2>Challenges and Considerations</h2>
      <p>While the potential is enormous, several challenges must be addressed:</p>

      <ul>
        <li><strong>Data Quality and Bias:</strong> AI tools are only as good as the data they're trained on</li>
        <li><strong>Interpretability:</strong> Researchers need to understand how AI arrives at its conclusions</li>
        <li><strong>Ethical Considerations:</strong> Ensuring AI tools are used responsibly in research</li>
        <li><strong>Accessibility:</strong> Making advanced AI tools available to researchers regardless of technical background</li>
      </ul>

      <h2>The Path Forward</h2>
      <p>At Trixode Studios, we believe the future of research lies in the seamless integration of AI capabilities with human creativity and intuition. Our mission is to build tools that amplify human intelligence rather than replace it, creating a symbiotic relationship between researchers and AI systems.</p>

      <p>The next decade will see AI research tools become more intuitive, more powerful, and more accessible. We're committed to being at the forefront of this transformation, building elegant solutions that empower the next generation of discoveries.</p>
    `,
    relatedPosts: [
      { slug: "building-elegant-software-architecture", title: "Building Elegant Software Architecture" },
      { slug: "bridging-academia-industry", title: "Bridging Academia and Industry" },
    ],
  },
  "building-elegant-software-architecture": {
    id: 2,
    title: "Building Elegant Software Architecture",
    category: "Software Dev",
    date: "2024-01-10",
    readTime: "8 min read",
    author: "Hussien Ballouk",
    excerpt:
      "A deep dive into the principles of creating maintainable, scalable, and beautiful code that stands the test of time.",
    content: `
      <p>In the world of software development, elegance is not just about aesthetics—it's about creating systems that are maintainable, scalable, and intuitive. Elegant software architecture serves as the foundation for applications that can evolve with changing requirements while maintaining their core integrity.</p>

      <h2>What Makes Architecture Elegant?</h2>
      <p>Elegant software architecture embodies several key principles:</p>

      <ul>
        <li><strong>Simplicity:</strong> Complex problems solved with simple, understandable solutions</li>
        <li><strong>Modularity:</strong> Components that work independently yet integrate seamlessly</li>
        <li><strong>Scalability:</strong> Systems that grow gracefully with increased demand</li>
        <li><strong>Maintainability:</strong> Code that future developers can understand and modify</li>
        <li><strong>Resilience:</strong> Architecture that handles failures gracefully</li>
      </ul>

      <h2>Core Architectural Principles</h2>

      <h3>1. Separation of Concerns</h3>
      <p>Each component should have a single, well-defined responsibility. This principle makes systems easier to understand, test, and maintain. When concerns are properly separated, changes in one area don't cascade unpredictably through the entire system.</p>

      <h3>2. Dependency Inversion</h3>
      <p>High-level modules should not depend on low-level modules. Both should depend on abstractions. This principle enables flexibility and makes systems more testable and maintainable.</p>

      <h3>3. Interface Segregation</h3>
      <p>Clients should not be forced to depend on interfaces they don't use. This leads to more focused, cohesive interfaces that are easier to implement and maintain.</p>

      <h2>Modern Architectural Patterns</h2>

      <h3>Microservices Architecture</h3>
      <p>Breaking applications into small, independent services that communicate over well-defined APIs. This pattern enables teams to work independently and deploy services at different cadences.</p>

      <h3>Event-Driven Architecture</h3>
      <p>Systems that respond to events rather than direct calls. This pattern enables loose coupling and high scalability, particularly important for modern distributed systems.</p>

      <h3>Clean Architecture</h3>
      <p>An approach that puts business logic at the center, surrounded by layers of increasing abstraction. This pattern ensures that business rules are independent of frameworks, databases, and external agencies.</p>

      <h2>Technology Choices and Trade-offs</h2>
      <p>Elegant architecture isn't about using the latest technology—it's about making thoughtful choices that align with your system's requirements:</p>

      <ul>
        <li><strong>Performance vs. Maintainability:</strong> Sometimes the most performant solution isn't the most maintainable</li>
        <li><strong>Flexibility vs. Simplicity:</strong> Over-engineering for future requirements can lead to unnecessary complexity</li>
        <li><strong>Consistency vs. Optimization:</strong> Consistent patterns are often more valuable than micro-optimizations</li>
      </ul>

      <h2>Building for the Future</h2>
      <p>Elegant architecture anticipates change without over-engineering for it. This means:</p>

      <ul>
        <li>Building abstractions at the right level</li>
        <li>Choosing technologies with longevity and community support</li>
        <li>Documenting architectural decisions and their rationale</li>
        <li>Regularly reviewing and refactoring architectural components</li>
      </ul>

      <h2>Conclusion</h2>
      <p>At Trixode Studios, we believe that elegant software architecture is the foundation of successful applications. It's not just about writing code that works—it's about creating systems that are beautiful in their simplicity, powerful in their capabilities, and resilient in their operation.</p>

      <p>The best architectures are those that feel inevitable in hindsight, where every component has its place and purpose, and the whole is greater than the sum of its parts.</p>
    `,
    relatedPosts: [
      { slug: "future-of-ai-research-tools", title: "The Future of AI in Research Tools" },
      { slug: "performance-optimization-ai-tools", title: "Performance Optimization for AI Tools" },
    ],
  },
  "bridging-academia-industry": {
    id: 3,
    title: "Bridging Academia and Industry",
    category: "Research Impact",
    date: "2024-01-05",
    readTime: "6 min read",
    author: "Hussien Ballouk",
    excerpt: "How we're working to close the gap between cutting-edge research and practical, real-world applications.",
    content: `
      <p>The gap between academic research and industry application has long been a challenge in the technology sector. Groundbreaking discoveries often remain confined to academic papers, while industry struggles to implement cutting-edge research in practical applications. At Trixode Studios, we're committed to bridging this divide.</p>

      <h2>Understanding the Gap</h2>
      <p>Several factors contribute to the disconnect between academia and industry:</p>

      <ul>
        <li><strong>Different Timelines:</strong> Academic research operates on longer timescales than industry product cycles</li>
        <li><strong>Risk Tolerance:</strong> Industry often requires proven solutions, while research explores uncharted territory</li>
        <li><strong>Communication Barriers:</strong> Academic papers may not effectively communicate practical applications</li>
        <li><strong>Resource Constraints:</strong> Researchers may lack the resources to develop production-ready implementations</li>
      </ul>

      <h2>Our Approach to Bridge Building</h2>

      <h3>1. Collaborative Research Projects</h3>
      <p>We partner with academic institutions to work on research projects that have clear pathways to practical application. This collaboration ensures that research is conducted with real-world constraints and opportunities in mind.</p>

      <h3>2. Rapid Prototyping</h3>
      <p>We specialize in taking research concepts and quickly developing functional prototypes that demonstrate practical value. This helps validate research findings and identify implementation challenges early.</p>

      <h3>3. Technology Translation</h3>
      <p>Our team includes experts who can translate complex research concepts into accessible implementations. We focus on making sophisticated algorithms and methodologies available to practitioners who may not have deep technical backgrounds.</p>

      <h2>Success Stories</h2>

      <h3>AI-Powered Research Tools</h3>
      <p>We've worked with several research institutions to transform their internal tools into production-ready applications. These tools, originally developed for specific research projects, now serve broader communities of researchers and practitioners.</p>

      <h3>Open Source Contributions</h3>
      <p>Many of our projects result in open-source libraries and tools that make research implementations more accessible. This approach ensures that the benefits of academic research reach a wider audience.</p>

      <h2>Challenges and Solutions</h2>

      <h3>Intellectual Property Considerations</h3>
      <p>Navigating IP concerns requires careful planning and clear agreements between academic and industry partners. We work to ensure that all parties benefit from collaborative efforts while respecting institutional policies.</p>

      <h3>Scaling Research Implementations</h3>
      <p>Research prototypes often need significant engineering work to become production-ready. We specialize in this translation process, ensuring that the core research insights are preserved while meeting industry standards for reliability and performance.</p>

      <h2>The Future of Academia-Industry Collaboration</h2>
      <p>We envision a future where the boundary between academic research and industry application becomes increasingly fluid. This will require:</p>

      <ul>
        <li>Better communication channels between researchers and practitioners</li>
        <li>Funding models that support translational research</li>
        <li>Educational programs that prepare researchers for industry collaboration</li>
        <li>Industry recognition of the value of long-term research investments</li>
      </ul>

      <h2>Our Commitment</h2>
      <p>At Trixode Studios, we're committed to being a bridge between these two worlds. We believe that the most impactful innovations occur when rigorous research meets practical application, and we're dedicated to making this connection as seamless as possible.</p>

      <p>By working with both academic researchers and industry practitioners, we help ensure that groundbreaking research finds its way into tools and applications that can make a real difference in the world.</p>
    `,
    relatedPosts: [
      { slug: "future-of-ai-research-tools", title: "The Future of AI in Research Tools" },
      { slug: "open-source-research-collaboration", title: "Open Source and Research Collaboration" },
    ],
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
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
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
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
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 text-sm font-black rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 text-white leading-tight">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 font-semibold">
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
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 md:p-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                color: "#d1d5db",
                lineHeight: "1.75",
              }}
            />
          </motion.article>

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <motion.section
              className="mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl font-black mb-8 text-white">RELATED POSTS</h2>
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
