"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Phone, Mail, Award, TrendingUp, Users, Home, CheckCircle2, ArrowLeft } from "lucide-react";

export default function Mockup2Page() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Stats data
  const stats = [
    { value: "$300M+", label: "IN LUXURY TRANSACTIONS" },
    { value: "10+", label: "YEARS OF EXCELLENCE" },
    { value: "100+", label: "SATISFIED CLIENTS" },
  ];

  // Services data
  const services = [
    {
      icon: Home,
      title: "LUXURY HOME ACQUISITION",
      description: "Strategic guidance for acquiring premium properties across Vancouver's North Shore. From West Vancouver estates to North Van custom builds.",
    },
    {
      icon: TrendingUp,
      title: "CUSTOM BUILD EXPERTISE",
      description: "Leverage construction background for land acquisition, builder selection, and oversight of award-winning custom homes.",
    },
    {
      icon: Users,
      title: "BILINGUAL SERVICE",
      description: "Fluent in English and Persian. Cultural bridge for high-net-worth clients seeking trusted representation in Vancouver's luxury market.",
    },
    {
      icon: Award,
      title: "DISCIPLINED REPRESENTATION",
      description: "Premium marketing, strategic pricing, and honest counsel. Associated with Georgie Awards, CHBA National Awards, and HAVAN Awards.",
    },
  ];

  // Portfolio properties
  const portfolio = [
    {
      title: "WEST VANCOUVER ESTATE",
      location: "British Properties",
      price: "$8.5M",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    },
    {
      title: "CUSTOM BUILD",
      location: "Edgemont Village",
      price: "$6.2M",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    },
    {
      title: "WATERFRONT RESIDENCE",
      location: "West Vancouver",
      price: "$12.8M",
      image: "https://images.unsplash.com/photo-1613490908578-8fc23f4b677a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Maz brings a rare combination of deep local knowledge, construction background, and strategic insight. What sets Maz apart is not just his technical skill, but his unwavering honesty, tireless work ethic, and genuine commitment to his clients' best interests.",
      author: "Mehrdad B.",
      location: "North Vancouver & Vancouver Downtown",
    },
    {
      quote: "From the very first meeting we had with him, he asked the right questions to fully understand our values and goals. He gave us adequate knowledge about the area we are choosing, neighborhood, even the challenges we might face in each of our choices.",
      author: "Maryam A.",
      location: "British Properties, West Vancouver",
    },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden font-montserrat">
      {/* Back Navigation */}
      <div className="fixed top-8 left-8 z-50">
        <Link
          href="/api/proposals/maz-majidi-geo-v2"
          className="flex items-center gap-2 text-white/50 hover:text-[#D2AF41] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold tracking-widest uppercase">Back</span>
        </Link>
      </div>

      {/* Full-Screen Cinematic Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            scale: prefersReducedMotion ? 1 : heroScale,
            opacity: prefersReducedMotion ? 1 : heroOpacity,
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90"
            alt="Luxury Vancouver Real Estate"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-black text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none mb-6">
              MAZ MAJIDI
            </h1>
            <div className="h-1 w-32 bg-[#D2AF41] mx-auto mb-8" />
            <p className="font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-white/90 mb-4">
              LUXURY REAL ESTATE ADVISOR
            </p>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto tracking-wide">
              VANCOUVER'S NORTH SHORE • ENGLISH & PERSIAN
            </p>
          </motion.div>

          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <a href="#contact" className="group">
              <motion.div
                className="bg-[#D2AF41] text-black px-12 py-5 font-bold text-lg tracking-widest hover:bg-white transition-colors duration-300"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
              >
                LET'S CONNECT
              </motion.div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Statement Stats */}
      <section className="bg-[#191919] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="font-black text-6xl md:text-7xl lg:text-8xl text-[#D2AF41] tracking-tighter mb-4">
                  {stat.value}
                </div>
                <div className="font-bold text-sm md:text-base text-white/60 tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-[500px] lg:h-[700px]">
            <Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Maz Majidi"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="bg-black px-8 md:px-16 lg:px-20 py-16 md:py-24 lg:py-32 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[#D2AF41] font-bold text-sm tracking-widest mb-6">
                WHO IS MAZ MAJIDI
              </div>
              <h2 className="font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-none mb-8">
                STRATEGIC<br />GUIDANCE<br />FOR LUXURY
              </h2>
              <div className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed">
                <p>
                  Maz Majidi is a real estate advisor specializing in West Vancouver, District of North Vancouver and North Vancouver, working with buyers and sellers across luxury homes, custom builds, and long-term property decisions.
                </p>
                <p>
                  With a background in Building Design from BCIT, hands-on construction management expertise, and a Master's degree in Business Administration in Marketing, Maz brings technical depth that sets him apart in Vancouver's luxury market.
                </p>
                <p>
                  Fluent in both English and Persian, he advises buyers and sellers who value clear guidance, disciplined representation, and honest counsel throughout their real estate journey.
                </p>
                <p>
                  Associated with award-recognized custom homes—including projects connected to the Georgie Awards, CHBA National Awards for Housing Excellence, and HAVAN Awards.
                </p>
              </div>

              <div className="mt-12 flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#D2AF41]" />
                  <span className="font-bold text-sm tracking-wide">BCIT BUILDING DESIGN</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#D2AF41]" />
                  <span className="font-bold text-sm tracking-wide">MBA MARKETING</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#D2AF41]" />
                  <span className="font-bold text-sm tracking-wide">BILINGUAL EN/FA</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#191919] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[#D2AF41] font-bold text-sm tracking-widest mb-6">
              COMPREHENSIVE SERVICES
            </div>
            <h2 className="font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter">
              WHAT I OFFER
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-black border-2 border-white/10 p-8 md:p-12 hover:border-[#D2AF41]/50 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                >
                  <Icon className="w-12 h-12 md:w-16 md:h-16 text-[#D2AF41] mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-black text-2xl md:text-3xl tracking-tight mb-4 group-hover:text-[#D2AF41] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-base md:text-lg leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-0">
        <div className="mb-16 md:mb-24 text-center px-4 md:px-8 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[#D2AF41] font-bold text-sm tracking-widest mb-6">
              RECENT SUCCESSES
            </div>
            <h2 className="font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter">
              PORTFOLIO
            </h2>
          </motion.div>
        </div>

        <div className="space-y-0">
          {portfolio.map((property, index) => (
            <motion.div
              key={index}
              className="relative h-[500px] md:h-[700px] w-full overflow-hidden group cursor-pointer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-[#D2AF41] font-bold text-sm tracking-widest mb-4">
                    {property.location}
                  </div>
                  <h3 className="font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-4 group-hover:text-[#D2AF41] transition-colors duration-300">
                    {property.title}
                  </h3>
                  <div className="font-bold text-3xl md:text-4xl text-white/90">
                    {property.price}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#191919] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[#D2AF41] font-bold text-sm tracking-widest mb-6">
              CLIENT TESTIMONIALS
            </div>
            <h2 className="font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter">
              WHAT CLIENTS SAY
            </h2>
          </motion.div>

          <div className="space-y-16 md:space-y-24">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="absolute -top-8 -left-4 text-[#D2AF41]/20 font-black text-9xl md:text-[12rem] leading-none">
                  "
                </div>
                <blockquote className="relative z-10 pl-8 md:pl-16">
                  <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed mb-8 italic">
                    {testimonial.quote}
                  </p>
                  <div className="border-t-2 border-[#D2AF41]/30 pt-6">
                    <div className="font-bold text-lg md:text-xl tracking-wide">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-white/60 tracking-wide mt-2">
                      {testimonial.location}
                    </div>
                  </div>
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
            alt="Contact"
            fill
            className="object-cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black/85" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-black text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-8">
              LET'S DISCUSS<br />YOUR NEXT MOVE
            </h2>
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
              Strategic guidance for Vancouver's North Shore luxury market. English & Persian service.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
              <a
                href="tel:+16045551234"
                className="group flex items-center gap-3 text-white hover:text-[#D2AF41] transition-colors duration-300"
              >
                <Phone className="w-6 h-6" />
                <span className="font-bold text-lg tracking-wide">
                  +1 (604) 555-1234
                </span>
              </a>
              <div className="hidden md:block w-px h-6 bg-white/30" />
              <a
                href="mailto:maz@example.com"
                className="group flex items-center gap-3 text-white hover:text-[#D2AF41] transition-colors duration-300"
              >
                <Mail className="w-6 h-6" />
                <span className="font-bold text-lg tracking-wide">
                  maz@example.com
                </span>
              </a>
            </div>

            <motion.a
              href="mailto:maz@example.com"
              className="inline-block bg-[#D2AF41] text-black px-16 py-6 font-bold text-xl tracking-widest hover:bg-white transition-colors duration-300"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
            >
              START A CONVERSATION
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-black text-2xl md:text-3xl tracking-tighter">
              MAZ MAJIDI
            </div>
            <div className="text-sm text-white/60 text-center md:text-left">
              Luxury Real Estate Advisor • Angell Hasman & Associates<br />
              Vancouver's North Shore • English & Persian
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-xs text-white/40 tracking-wide">
              © {new Date().getFullYear()} Maz Majidi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
