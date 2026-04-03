"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Award,
  Home,
  Users,
  Building,
  Globe2,
  Mail,
  Phone,
  ChevronRight,
  ChevronLeft,
  Star
} from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

export default function Mockup1Page() {
  const prefersReducedMotion = useReducedMotion()
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0)

  const testimonials = [
    {
      name: "Abdu G.",
      role: "Buyer, Port Moody",
      quote: "I had an excellent experience working with Maz throughout my home-buying process. Maz was consistently punctual, efficient, and meticulous. Maz managed the negotiation process effectively and secured a strong deal on my behalf."
    },
    {
      name: "Coco P.",
      role: "Seller, Edgemont Village",
      quote: "He is very professional, honest, and easy to communicate with. He truly cared about my needs and worked hard to get the best result."
    },
    {
      name: "Maryam A.",
      role: "Buyer, British Properties",
      quote: "From the very first meeting, he asked the right questions to fully understand our values and goals. He gave us adequate knowledge about the area, neighborhood, even the challenges we might face."
    },
    {
      name: "Mehrdad B.",
      role: "Buyer & Seller, North Vancouver",
      quote: "Maz brings a rare combination of deep local knowledge, construction background, and strategic insight. What sets Maz apart is not just his technical skill, but his unwavering honesty, tireless work ethic, and genuine commitment to his clients' best interests."
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: prefersReducedMotion ? 0 : 0.6 }
  }

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FFC421]/20">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/api/proposals/maz-majidi-geo-v2" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-wider uppercase font-light">Back to Pitch</span>
          </Link>
          <div className="text-xl tracking-[0.15em] font-light">
            MAZ <span className="text-[#FFC421] font-semibold">MAJIDI</span>
          </div>
          <div className="text-xs uppercase tracking-widest text-white/50">
            Mockup 1
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div {...fadeInUp}>
              <div className="inline-block mb-4 px-4 py-2 border border-[#FFC421]/30 bg-[#FFC421]/5 rounded-full">
                <span className="text-xs tracking-[0.2em] uppercase text-[#FFC421]">Luxury Real Estate Advisor</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-[1.1]">
                Meet <br />
                <span className="font-semibold">Maz Majidi</span>
              </h1>

              <p className="text-lg text-white/60 mb-8 leading-relaxed max-w-xl">
                A real estate advisor specializing in West Vancouver, District of North Vancouver and North Vancouver, working with buyers and sellers across luxury homes, custom builds, and long-term property decisions.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="#contact"
                  className="px-8 py-4 bg-[#FFC421] text-black font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-[#FFD152] transition-colors"
                >
                  Let's Connect
                </a>
                <a
                  href="#portfolio"
                  className="px-8 py-4 border border-white/20 text-white text-sm tracking-wider uppercase rounded-sm hover:bg-white/5 transition-colors"
                >
                  View Portfolio
                </a>
              </div>

              {/* Credentials */}
              <div className="flex flex-wrap gap-6 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#FFC421]" />
                  <span>BCIT Building Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#FFC421]" />
                  <span>MBA Marketing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-[#FFC421]" />
                  <span>English & Persian</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Professional Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] lg:h-[650px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFC421]/20 to-transparent rounded-sm" />
              <div className="relative h-full border border-white/10 rounded-sm overflow-hidden">
                <Image
                  src="https://mazmajidi.ca/wp-content/uploads/2026/01/MEET-MAZ-ON-HOME-PAGE-e1769211794373-919x1024.webp"
                  alt="Maz Majidi - Luxury Real Estate Advisor"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 px-6 border-y border-white/10 bg-white/5">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="text-center md:text-left">
            <div className="text-4xl md:text-5xl font-light mb-2 text-[#FFC421]">$300M+</div>
            <div className="text-sm uppercase tracking-wider text-white/50">Luxury Transactions</div>
          </motion.div>
          <motion.div variants={fadeInUp} className="text-center md:text-left">
            <div className="text-4xl md:text-5xl font-light mb-2 text-[#FFC421]">10+ Years</div>
            <div className="text-sm uppercase tracking-wider text-white/50">Market Experience</div>
          </motion.div>
          <motion.div variants={fadeInUp} className="text-center md:text-left">
            <div className="text-4xl md:text-5xl font-light mb-2 text-[#FFC421]">Award-Winning</div>
            <div className="text-sm uppercase tracking-wider text-white/50">Custom Homes</div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="text-xs tracking-[0.2em] uppercase text-[#FFC421] mb-4">About Maz</div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Technical Expertise Meets <span className="font-semibold">Market Authority</span>
              </h2>

              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  Maz Majidi is a real estate advisor specializing in West Vancouver, District of North Vancouver and North Vancouver. Background in Building Design from BCIT, hands-on construction management expertise, and MBA in Marketing.
                </p>
                <p>
                  Fluent in English and Persian, he serves as a cultural bridge for high-net-worth clients seeking sophisticated representation on Vancouver's North Shore.
                </p>
                <p>
                  Associated with award-recognized custom homes including Georgie Awards, CHBA National Awards for Housing Excellence, and HAVAN Awards, reflecting involvement in high quality residential real estate on the North Shore.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] rounded-sm overflow-hidden border border-white/10"
            >
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Luxury North Shore Property"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="text-xs tracking-[0.2em] uppercase text-[#FFC421] mb-4">Services</div>
            <h2 className="text-4xl md:text-5xl font-light">
              Comprehensive <span className="font-semibold">Advisory Services</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {/* Buyers */}
            <motion.div
              variants={fadeInUp}
              className="group p-8 border border-white/10 rounded-sm hover:border-[#FFC421]/50 transition-all duration-300 bg-black/40"
            >
              <div className="w-12 h-12 mb-6 rounded-full bg-[#FFC421]/10 flex items-center justify-center">
                <Home className="w-6 h-6 text-[#FFC421]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Buyers</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                Strategic guidance for luxury home acquisition, custom builds, and long-term property decisions. Leveraging deep local knowledge and construction expertise to ensure you make well-informed investments.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#FFC421] mt-0.5 flex-shrink-0" />
                  <span>Off-market opportunity access</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#FFC421] mt-0.5 flex-shrink-0" />
                  <span>Construction quality assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#FFC421] mt-0.5 flex-shrink-0" />
                  <span>Neighborhood deep-dives</span>
                </li>
              </ul>
            </motion.div>

            {/* Sellers */}
            <motion.div
              variants={fadeInUp}
              className="group p-8 border border-white/10 rounded-sm hover:border-[#FFC421]/50 transition-all duration-300 bg-black/40"
            >
              <div className="w-12 h-12 mb-6 rounded-full bg-[#FFC421]/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#FFC421]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Sellers</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                Premium marketing, strategic pricing, and disciplined representation. Positioning your property to attract qualified buyers while maximizing market value through data-driven insights.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#FFC421] mt-0.5 flex-shrink-0" />
                  <span>Professional photography & staging</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#FFC421] mt-0.5 flex-shrink-0" />
                  <span>Market analysis & pricing strategy</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#FFC421] mt-0.5 flex-shrink-0" />
                  <span>Negotiation expertise</span>
                </li>
              </ul>
            </motion.div>

            {/* Custom Builds */}
            <motion.div
              variants={fadeInUp}
              className="group p-8 border border-white/10 rounded-sm hover:border-[#FFC421]/50 transition-all duration-300 bg-black/40"
            >
              <div className="w-12 h-12 mb-6 rounded-full bg-[#FFC421]/10 flex items-center justify-center">
                <Building className="w-6 h-6 text-[#FFC421]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Custom Builds</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                Land acquisition, builder selection, and construction oversight. Drawing on BCIT Building Design background and award-winning project experience to guide your custom home journey.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#FFC421] mt-0.5 flex-shrink-0" />
                  <span>Zoning & development potential analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#FFC421] mt-0.5 flex-shrink-0" />
                  <span>Builder vetting & selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#FFC421] mt-0.5 flex-shrink-0" />
                  <span>Construction phase support</span>
                </li>
              </ul>
            </motion.div>

            {/* Bilingual Service */}
            <motion.div
              variants={fadeInUp}
              className="group p-8 border border-white/10 rounded-sm hover:border-[#FFC421]/50 transition-all duration-300 bg-black/40"
            >
              <div className="w-12 h-12 mb-6 rounded-full bg-[#FFC421]/10 flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-[#FFC421]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Bilingual Service</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                Fluent English and Persian representation for clients who value clear, culturally-informed guidance throughout the real estate process. Bridging language and cultural nuances seamlessly.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#FFC421] mt-0.5 flex-shrink-0" />
                  <span>Persian-speaking luxury advisor</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#FFC421] mt-0.5 flex-shrink-0" />
                  <span>Cultural competence & understanding</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#FFC421] mt-0.5 flex-shrink-0" />
                  <span>Trusted advisor relationships</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section id="portfolio" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="text-xs tracking-[0.2em] uppercase text-[#FFC421] mb-4">Portfolio</div>
            <h2 className="text-4xl md:text-5xl font-light">
              North Shore <span className="font-semibold">Luxury Properties</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* West Vancouver Property */}
            <motion.div
              {...fadeInUp}
              className="group relative h-[500px] rounded-sm overflow-hidden border border-white/10"
            >
              <Image
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="West Vancouver Luxury Estate"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="text-xs tracking-[0.2em] uppercase text-[#FFC421] mb-2">West Vancouver</div>
                <h3 className="text-2xl font-semibold mb-2">British Properties Estate</h3>
                <p className="text-white/60 text-sm mb-4">6 bed | 7 bath | 5,800 sq ft | Panoramic Ocean Views</p>
                <div className="text-3xl font-light text-[#FFC421]">$8,950,000</div>
              </div>
            </motion.div>

            {/* North Vancouver Property */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative h-[500px] rounded-sm overflow-hidden border border-white/10"
            >
              <Image
                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="North Vancouver Modern Home"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="text-xs tracking-[0.2em] uppercase text-[#FFC421] mb-2">North Vancouver</div>
                <h3 className="text-2xl font-semibold mb-2">Edgemont Village Contemporary</h3>
                <p className="text-white/60 text-sm mb-4">5 bed | 5 bath | 4,200 sq ft | Custom Build</p>
                <div className="text-3xl font-light text-[#FFC421]">$4,850,000</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="text-xs tracking-[0.2em] uppercase text-[#FFC421] mb-4">Testimonials</div>
            <h2 className="text-4xl md:text-5xl font-light">
              What Clients <span className="font-semibold">Say</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-black/40 border border-white/10 rounded-sm p-8 md:p-12"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFC421] text-[#FFC421]" />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 italic">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{testimonials[currentTestimonial].name}</div>
                  <div className="text-sm text-white/50">{testimonials[currentTestimonial].role}</div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Testimonial indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'w-8 bg-[#FFC421]'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="text-xs tracking-[0.2em] uppercase text-[#FFC421] mb-4">Get In Touch</div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Let's <span className="font-semibold">Connect</span>
              </h2>

              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                Whether you're buying, selling, or exploring custom build opportunities on Vancouver's North Shore, let's discuss how strategic guidance can maximize your real estate outcomes.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFC421]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#FFC421]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50 mb-1">Email</div>
                    <a href="mailto:info@mazmajidi.ca" className="text-white hover:text-[#FFC421] transition-colors">
                      info@mazmajidi.ca
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFC421]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#FFC421]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50 mb-1">Phone</div>
                    <a href="tel:+16047268081" className="text-white hover:text-[#FFC421] transition-colors">
                      +1 (604) 726-8081
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFC421]/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-[#FFC421]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50 mb-1">Brokerage</div>
                    <div className="text-white">Angell Hasman & Associates</div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <a
                  href="mailto:info@mazmajidi.ca"
                  className="inline-block px-8 py-4 bg-[#FFC421] text-black font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-[#FFD152] transition-colors"
                >
                  Schedule a Consultation
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] rounded-sm overflow-hidden border border-white/10"
            >
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="North Shore Vancouver Cityscape"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="text-2xl font-light text-white mb-2">North Shore Vancouver</div>
                <div className="text-white/60">West Vancouver | District of North Vancouver | City of North Vancouver</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xl tracking-[0.15em] font-light">
              MAZ <span className="text-[#FFC421] font-semibold">MAJIDI</span>
            </div>

            <div className="text-sm text-white/50 text-center md:text-right">
              <p>Luxury Real Estate Advisor | Angell Hasman & Associates</p>
              <p className="mt-1">English & Persian | BCIT Building Design | MBA Marketing</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs text-white/40">
            <p>© {new Date().getFullYear()} Maz Majidi. All rights reserved. | Mockup 1: Digital FinTech Style</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
