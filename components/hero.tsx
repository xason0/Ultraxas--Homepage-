"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, MessageCircle, Rocket } from "lucide-react"

interface HeroProps {
  onChatClick: () => void
}

export default function Hero({ onChatClick }: HeroProps) {
  const [displayText, setDisplayText] = useState("")
  const fullText = "Turning Vision into Code"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative z-10">
      <div className="text-center max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-1"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center relative">
                <motion.div
                  animate={{
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Image
                    src="/images/ultraxas-logo.png"
                    alt="UltraXas Dev Logo"
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                    style={{
                      filter: "drop-shadow(0 0 40px rgba(147, 51, 234, 0.8))",
                    }}
                  />
                </motion.div>

                {/* Floating particles around logo */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                    animate={{
                      x: [0, Math.cos((i * 45 * Math.PI) / 180) * 80],
                      y: [0, Math.sin((i * 45 * Math.PI) / 180) * 80],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Multiple animated rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{
                background: "conic-gradient(from 0deg, #a855f7, #ec4899, #06b6d4, #10b981, #a855f7)",
                WebkitMask: "radial-gradient(circle, transparent 62px, black 64px)",
                mask: "radial-gradient(circle, transparent 62px, black 64px)",
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute inset-0 rounded-full border border-transparent"
              style={{
                background: "conic-gradient(from 180deg, #ec4899, #06b6d4, #a855f7, #ec4899)",
                WebkitMask: "radial-gradient(circle, transparent 66px, black 68px)",
                mask: "radial-gradient(circle, transparent 66px, black 68px)",
              }}
              animate={{
                rotate: [360, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <motion.span
            className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundSize: "300% 300%",
              backgroundImage: "linear-gradient(45deg, #a855f7, #ec4899, #06b6d4, #10b981, #f59e0b, #a855f7)",
            }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(147, 51, 234, 0.8)",
                  "0 0 40px rgba(236, 72, 153, 0.8)",
                  "0 0 20px rgba(6, 182, 212, 0.8)",
                  "0 0 20px rgba(147, 51, 234, 0.8)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              UltraXas Dev
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* Typing Subtitle */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mb-12">
          <p className="text-2xl md:text-3xl text-gray-300 font-light">
            {displayText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="text-purple-400"
            >
              |
            </motion.span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 relative z-20"
        >
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="bg-black hover:bg-gray-800 text-white border border-purple-500/50 px-8 py-4 text-lg rounded-full relative z-30 cursor-pointer"
            style={{
              boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)",
            }}
          >
            <Rocket className="mr-2 h-5 w-5" />
            Explore Projects
          </Button>
          <Button
            onClick={onChatClick}
            size="lg"
            className="bg-black hover:bg-gray-800 text-white border border-purple-500/50 px-8 py-4 text-lg rounded-full relative z-30 cursor-pointer"
            style={{
              boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)",
            }}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chat with Assistant
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="flex flex-col items-center relative z-20"
        >
          <p className="text-gray-400 mb-2">Scroll to explore</p>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <ArrowDown className="h-6 w-6 text-purple-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
