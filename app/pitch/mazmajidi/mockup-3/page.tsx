"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Mail,
  Phone,
  ChevronRight,
  ChevronLeft,
  Star,
  Award,
  Home,
  Users,
  Building,
  Globe2
} from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

export default function Mockup3Page() {
  const prefersReducedMotion = useReducedMotion()
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0)
  const [currentProperty, setCurrentProperty] = React.useState(0)

  const testimonials = [
    {
      name: "Abdu G.",
      role: "Buyer, Port Moody",
      quote: "I had an excellent experience working with Maz throughout my home-buying process. Maz was consistently punctual, efficient, and meticulous. Maz managed the negotiation process effectively and secured a strong deal on my behalf."
    },
    {
      name: "Coco P.",
      role: "Seller, Edgemont Village North Vancouver",
      quote: "He is very professional, honest, and easy to communicate with. He truly cared about my needs and worked hard to get the best result."
    },
    {
      name: "Maryam A.",
      role: "Buyer, British Properties West Vancouver",
      quote: "From the very first meeting we had with him, he asked the right questions to fully understand our values and goals. He gave us adequate knowledge about the area we are choosing, neighborhood, even the challenges we might face in each of our choices."
    },
    {
      name: "Mehrdad B.",
      role: "Buyer & Seller, North Vancouver & Vancouver Downtown",
      quote: "Maz brings a rare combination of deep local knowledge, construction background, and strategic insight. What sets Maz apart is not just his technical skill, but his unwavering honesty, tireless work ethic, and genuine commitment to his clients' best interests."
    }
  ]

  const properties = [
    {
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90",
      title: "West Vancouver Estate",
      beds: 6,
      baths: 7,
      sqft: "8,500",
      price: "PRICE UPON REQUEST"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90",
      title: "British Properties Sanctuary",
      beds: 5,
      baths: 6,
      sqft: "6,200",
      price: "$8,950,000"
    },
    {
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90",
      title: "Edgemont Village Modern",
      beds: 4,
      baths: 5,
      sqft: "4,800",
      price: "$4,200,000"
    }
  ]

  const communities = [
    {
      name: "West Vancouver",
      image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85"
    },
    {
      name: "British Properties",
      image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85"
    },
    {
      name: "Edgemont Village",
      image: "https://images.unsplash.com/photo-1465146633011-14f8e0781093?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85"
    },
    {
      name: "North Vancouver",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85"
    },
    {
      name: "Vancouver Westside",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85"
    },
    {
      name: "Downtown Vancouver",
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85"
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const nextProperty = () => {
    setCurrentProperty((prev) => (prev + 1) % properties.length)
  }

  const prevProperty = () => {
    setCurrentProperty((prev) => (prev - 1 + properties.length) % properties.length)
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: prefersReducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }
  }

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
    viewport: { once: true }
  }

  const staggerChild = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }
  }

  return (
    <div className="min-h-screen bg-white text-[#34394D] font-serif antialiased selection:bg-[#BEB09E]/20">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#34394D]/10">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/api/proposals/maz-majidi-geo-v2" className="flex items-center gap-2.5 text-[#34394D]/50 hover:text-[#34394D] transition-colors group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-light">Return</span>
          </Link>
          <div className="text-xl tracking-wider">
            MAZ MAJIDI
          </div>
          <div className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#BEB09E]">
            Vancouver
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="max-w-4xl mx-auto text-center" {...fadeInUp}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl mb-8 font-normal tracking-tight leading-[1.1] text-[#211F1F]">
              VANCOUVER'S #1<br />LUXURY REALTOR
            </h1>
            <p className="text-xl md:text-2xl text-[#34394D]/70 font-sans font-light tracking-wide uppercase mb-4">
              The Last 10 Consecutive Years
            </p>
            <p className="text-lg text-[#34394D]/60 max-w-2xl mx-auto leading-relaxed">
              With over 10 years of experience, Maz Majidi is a distinguished figure in Vancouver's luxury real estate market,
              with unparalleled commitment to excellence and the Vancouver lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <motion.section className="px-8 pb-24" {...fadeInUp}>
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[16/9] rounded-sm overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=90"
              alt="Vancouver Luxury Real Estate"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <section className="py-24 px-8 bg-[#F9F8F4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-5xl md:text-6xl mb-8 font-normal tracking-tight leading-[1.15]">
                MEET<br />MAZ MAJIDI
              </h2>
            </motion.div>
            <motion.div {...fadeInUp} className="space-y-6">
              <p className="text-lg leading-relaxed text-[#34394D]/80">
                With over 10 years of experience in Vancouver's luxury real estate market, Maz Majidi has established
                himself as a trusted advisor to discerning clients. His background in Building Design (BCIT) and MBA in Marketing
                provides a unique perspective that combines technical expertise with sophisticated market strategy.
              </p>
              <p className="text-lg leading-relaxed text-[#34394D]/80">
                As a licensed realtor with Angell Hasman & Associates Realty, Maz has facilitated over $300 million in
                transactions throughout his career. Fluent in both English and Persian, he serves an international clientele
                with cultural competence and unwavering dedication.
              </p>
              <p className="text-lg leading-relaxed text-[#34394D]/80">
                Maz understands the value of a real estate investment in a way that few can articulate, using his intuition
                and market knowledge to maximize returns for his clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-24 px-8">
        <motion.div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8" variants={staggerContainer} initial="initial" whileInView="whileInView">
          <motion.div variants={staggerChild} className="group cursor-pointer">
            <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-sm shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85"
                alt="Bespoke Marketing"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <h3 className="text-2xl mb-3 tracking-wide font-sans uppercase text-[#34394D]">BESPOKE MARKETING</h3>
            <p className="text-[#34394D]/70 leading-relaxed">
              Sophisticated marketing strategies tailored to showcase your property's unique character and maximize market exposure.
            </p>
          </motion.div>

          <motion.div variants={staggerChild} className="group cursor-pointer">
            <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-sm shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85"
                alt="Property Valuation"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <h3 className="text-2xl mb-3 tracking-wide font-sans uppercase text-[#34394D]">PROPERTY VALUATION</h3>
            <p className="text-[#34394D]/70 leading-relaxed">
              Comprehensive market analysis and valuation services leveraging deep understanding of Vancouver's luxury market dynamics.
            </p>
          </motion.div>

          <motion.div variants={staggerChild} className="group cursor-pointer">
            <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-sm shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85"
                alt="Custom Builds"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <h3 className="text-2xl mb-3 tracking-wide font-sans uppercase text-[#34394D]">CUSTOM BUILDS</h3>
            <p className="text-[#34394D]/70 leading-relaxed">
              Expert guidance through land acquisition, design, and construction, leveraging BCIT Building Design expertise.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-8 bg-[#F9F8F4]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-5xl md:text-6xl mb-6 font-normal tracking-tight">PROVEN RESULTS</h2>
            <p className="text-lg text-[#34394D]/70 tracking-wide uppercase font-sans font-light">
              Consistently honored among Vancouver's select multi-million dollar producers
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-12" variants={staggerContainer} initial="initial" whileInView="whileInView">
            <motion.div variants={staggerChild} className="text-center">
              <div className="text-6xl md:text-7xl mb-4 text-[#BEB09E]">$300M+</div>
              <div className="text-sm tracking-wide uppercase font-sans text-[#34394D]/70">in Career Sales</div>
            </motion.div>
            <motion.div variants={staggerChild} className="text-center">
              <div className="text-6xl md:text-7xl mb-4 text-[#BEB09E]">#1</div>
              <div className="text-sm tracking-wide uppercase font-sans text-[#34394D]/70">Realtor in Vancouver</div>
            </motion.div>
            <motion.div variants={staggerChild} className="text-center">
              <div className="text-6xl md:text-7xl mb-4 text-[#BEB09E]">10+</div>
              <div className="text-sm tracking-wide uppercase font-sans text-[#34394D]/70">Years Experience</div>
            </motion.div>
            <motion.div variants={staggerChild} className="text-center">
              <div className="text-6xl md:text-7xl mb-4 text-[#BEB09E]">2</div>
              <div className="text-sm tracking-wide uppercase font-sans text-[#34394D]/70">Languages Fluent</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Current Inventory */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-5xl md:text-6xl mb-6 font-normal tracking-tight">MAZ'S CURRENT INVENTORY</h2>
            <p className="text-lg text-[#34394D]/70 tracking-wide uppercase font-sans font-light">
              Representing a bespoke collection of Vancouver's finest properties
            </p>
          </motion.div>

          <div className="relative">
            <motion.div {...fadeInUp} className="relative aspect-[16/10] rounded-sm overflow-hidden mb-8">
              <Image
                src={properties[currentProperty].image}
                alt={properties[currentProperty].title}
                fill
                className="object-cover"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-sm">
                <span className="text-xs tracking-wider uppercase font-sans text-[#34394D]">For Sale</span>
              </div>
            </motion.div>

            <div className="flex items-center justify-between">
              <button
                onClick={prevProperty}
                className="p-3 hover:bg-[#F9F8F4] transition-colors rounded-full"
                aria-label="Previous property"
              >
                <ChevronLeft className="w-6 h-6 text-[#34394D]" strokeWidth={1.5} />
              </button>

              <div className="text-center flex-1">
                <h3 className="text-3xl mb-3 tracking-wide font-sans uppercase">{properties[currentProperty].title}</h3>
                <p className="text-[#34394D]/70 mb-2">
                  {properties[currentProperty].beds} Beds | {properties[currentProperty].baths} Baths | {properties[currentProperty].sqft} Sq.Ft.
                </p>
                <p className="text-2xl text-[#BEB09E] tracking-wider">{properties[currentProperty].price}</p>
              </div>

              <button
                onClick={nextProperty}
                className="p-3 hover:bg-[#F9F8F4] transition-colors rounded-full"
                aria-label="Next property"
              >
                <ChevronRight className="w-6 h-6 text-[#34394D]" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Property */}
      <section className="py-24 px-8 bg-[#F9F8F4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90"
                  alt="Recent Notable Sale"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </motion.div>

            <motion.div {...fadeInUp}>
              <h2 className="text-5xl md:text-6xl mb-8 font-normal tracking-tight leading-[1.15]">
                RECENT<br />NOTABLE SALE
              </h2>
              <h3 className="text-2xl mb-6 tracking-wide font-sans uppercase text-[#BEB09E]">
                WEST VANCOUVER, BC MODERN MASTERPIECE
              </h3>
              <p className="text-lg leading-relaxed text-[#34394D]/80 mb-8">
                Nestled within the pristine confines of British Properties' most exclusive enclave, this opulent estate
                stands as one of the area's most distinguished residences. Emanating an aura of unparalleled luxury,
                it boasts an abundance of space for gracious living and grand entertainment.
              </p>
              <button className="px-8 py-3 border border-[#34394D]/20 hover:bg-[#34394D] hover:text-white transition-colors rounded-sm text-sm tracking-wider uppercase font-sans">
                DISCOVER PROPERTY
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Communities */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-5xl md:text-6xl mb-6 font-normal tracking-tight">EXPLORE COMMUNITIES</h2>
            <p className="text-lg text-[#34394D]/70 tracking-wide uppercase font-sans font-light">
              Vancouver Real Estate
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer} initial="initial" whileInView="whileInView">
            {communities.map((community, idx) => (
              <motion.div key={idx} variants={staggerChild} className="group cursor-pointer">
                <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-sm">
                  <Image
                    src={community.image}
                    alt={community.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-2xl tracking-wide font-sans uppercase text-center group-hover:text-[#BEB09E] transition-colors">
                  {community.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-8 bg-[#F9F8F4]">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-5xl md:text-6xl mb-6 font-normal tracking-tight">CLIENT TESTIMONIALS</h2>
            <p className="text-lg text-[#34394D]/70 tracking-wide uppercase font-sans font-light">
              What clients say
            </p>
          </motion.div>

          <div className="relative">
            <motion.div {...fadeInUp} className="text-center px-12">
              <div className="mb-8">
                <Star className="w-8 h-8 text-[#BEB09E] fill-[#BEB09E] mx-auto" />
              </div>
              <p className="text-2xl md:text-3xl leading-relaxed mb-12 text-[#34394D]/90 italic">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <div>
                <div className="text-xl mb-2 tracking-wide font-sans uppercase">{testimonials[currentTestimonial].name}</div>
                <div className="text-sm text-[#34394D]/60 tracking-wider uppercase font-sans font-light">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </motion.div>

            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={prevTestimonial}
                className="p-3 hover:bg-white transition-colors rounded-full"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-[#34394D]" strokeWidth={1.5} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentTestimonial ? 'bg-[#BEB09E] w-8' : 'bg-[#34394D]/20'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 hover:bg-white transition-colors rounded-full"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-[#34394D]" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Work With Maz */}
      <section className="py-32 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl mb-8 font-normal tracking-tight leading-[1.1]">
              WORK WITH MAZ
            </h2>
            <p className="text-lg text-[#34394D]/70 tracking-wide uppercase font-sans font-light mb-8">
              Global Connections. Local Expertise. World Class Marketing.
            </p>
            <p className="text-xl leading-relaxed text-[#34394D]/80 mb-12 max-w-3xl mx-auto">
              Whether buying or selling, Maz delivers service beyond comparison. Maz works closely with each of his clients
              to find their ultimate property in the most premier locations, and secures the best deal. When listing real estate,
              Maz maximizes each property's market value with his unmatched marketing strategy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-10 py-4 bg-[#34394D] text-white hover:bg-[#BEB09E] transition-colors rounded-sm text-sm tracking-wider uppercase font-sans">
                CONTACT
              </button>
              <button className="px-10 py-4 border border-[#34394D]/20 hover:bg-[#F9F8F4] transition-colors rounded-sm text-sm tracking-wider uppercase font-sans">
                HOME SEARCH
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-8 bg-[#F9F8F4]">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center" {...fadeInUp}>
            <h2 className="text-5xl md:text-6xl mb-6 font-normal tracking-tight">STAY UPDATED</h2>
            <p className="text-lg leading-relaxed text-[#34394D]/80 mb-10 max-w-2xl mx-auto">
              Maz understands the value of a real estate investment in a way that few can articulate, using his uncanny
              intuition to maximize returns for his clients.
            </p>
            <button className="px-10 py-4 bg-[#34394D] text-white hover:bg-[#BEB09E] transition-colors rounded-sm text-sm tracking-wider uppercase font-sans">
              SIGN UP
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-[#34394D]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl mb-6 tracking-wide font-sans uppercase">MAZ MAJIDI</h3>
              <div className="space-y-3 text-[#34394D]/70">
                <a href="tel:6047268081" className="block hover:text-[#34394D] transition-colors">
                  604.726.8081
                </a>
                <a href="mailto:maz@angelhasman.com" className="block hover:text-[#34394D] transition-colors">
                  maz@angelhasman.com
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm mb-4 tracking-wider uppercase font-sans text-[#34394D]/70">ADDRESS</h4>
              <div className="text-[#34394D]/70">
                Suite 130, 15300 Croydon Drive<br />
                Surrey, BC V3Z 0Z5
              </div>
            </div>

            <div>
              <nav className="space-y-3">
                <Link href="/" className="block text-[#34394D]/70 hover:text-[#34394D] transition-colors text-sm tracking-wider uppercase font-sans">
                  HOME
                </Link>
                <Link href="#" className="block text-[#34394D]/70 hover:text-[#34394D] transition-colors text-sm tracking-wider uppercase font-sans">
                  ABOUT MAZ
                </Link>
                <Link href="#" className="block text-[#34394D]/70 hover:text-[#34394D] transition-colors text-sm tracking-wider uppercase font-sans">
                  FEATURED PROPERTIES
                </Link>
                <Link href="#" className="block text-[#34394D]/70 hover:text-[#34394D] transition-colors text-sm tracking-wider uppercase font-sans">
                  NEIGHBORHOODS
                </Link>
              </nav>
            </div>
          </div>

          <div className="pt-8 border-t border-[#34394D]/10 text-center text-sm text-[#34394D]/60">
            <p>Angell Hasman & Associates Realty</p>
            <p className="mt-2">Copyright © 2026 | Privacy Policy</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
