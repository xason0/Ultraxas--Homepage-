"use client"
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
import ThemeSwitcher from "@/components/theme-switcher"
import BackgroundSwitcher from "@/components/background-switcher"
import { BackgroundRenderer } from "@/components/background-renderer"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Animated Background */}
      <BackgroundRenderer />

      {/* Floating Elements */}
      <FloatingElements />

      {/* Main Content */}
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <TechStack />
      <Contact />
      <Footer />

      {/* Floating Components */}
      <Chatbot />
      <SocialModal />
      <ThemeSwitcher />
      <BackgroundSwitcher />
    </div>
  )
}
