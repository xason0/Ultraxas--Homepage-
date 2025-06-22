"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import About from "@/components/about"
import TechStack from "@/components/tech-stack"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"
import SocialModal from "@/components/social-modal"
import FloatingElements from "@/components/floating-elements"

export default function HomePage() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Rainbow Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/10 via-purple-900/10 to-pink-900/10 animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/15 via-pink-900/15 to-purple-900/15 animate-pulse delay-2000" />
      </div>

      {/* Starfield Effect */}
      <div className="fixed inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <FloatingElements />

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar onSocialClick={() => setIsSocialModalOpen(true)} />
        <Hero onChatClick={() => setIsChatbotOpen(true)} />
        <Projects />
        <About />
        <TechStack />
        <Contact />
        <Footer />
      </div>

      {/* Chatbot */}
      <Chatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
      />

      {/* Social Modal */}
      <SocialModal isOpen={isSocialModalOpen} onClose={() => setIsSocialModalOpen(false)} />
    </div>
  )
}
