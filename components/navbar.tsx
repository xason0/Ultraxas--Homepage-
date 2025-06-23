"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onSocialClick: () => void
}

export default function Navbar({ onSocialClick }: NavbarProps) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/20"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
          <div className="relative">
            <motion.div
              className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 p-0.5"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Image
                    src="/images/ultraxas-logo.png"
                    alt="UltraXas Dev Logo"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.8))",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Animated ring around logo */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
              style={{
                background: "conic-gradient(from 0deg, #a855f7, #ec4899, #06b6d4, #a855f7)",
                WebkitMask: "radial-gradient(circle, transparent 20px, black 22px)",
                mask: "radial-gradient(circle, transparent 20px, black 22px)",
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </div>

          <motion.span
            className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
              backgroundImage: "linear-gradient(45deg, #a855f7, #ec4899, #06b6d4, #a855f7)",
            }}
          >
            UltraXas Dev
          </motion.span>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => scrollToSection("projects")}
            className="text-gray-300 hover:text-purple-400 transition-colors"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-gray-300 hover:text-purple-400 transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-gray-300 hover:text-purple-400 transition-colors"
          >
            Contact
          </button>
          <Button
            onClick={onSocialClick}
            className="bg-black hover:bg-gray-800 text-white border border-purple-500/50 rounded-full px-6 py-2"
            style={{
              boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
            }}
          >
            Connect With Us
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            onClick={onSocialClick}
            size="sm"
            className="bg-black hover:bg-gray-800 text-white border border-purple-500/50 rounded-full"
          >
            Connect
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}
