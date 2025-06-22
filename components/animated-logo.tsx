"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export default function AnimatedLogo({ size = "md", showText = true, className = "" }: AnimatedLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-32 h-32",
  }

  const imageSizes = {
    sm: 28,
    md: 40,
    lg: 120,
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 p-0.5`}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
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
                width={imageSizes[size]}
                height={imageSizes[size]}
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
            WebkitMask:
              size === "lg"
                ? "radial-gradient(circle, transparent 62px, black 64px)"
                : size === "md"
                  ? "radial-gradient(circle, transparent 22px, black 24px)"
                  : "radial-gradient(circle, transparent 14px, black 16px)",
            mask:
              size === "lg"
                ? "radial-gradient(circle, transparent 62px, black 64px)"
                : size === "md"
                  ? "radial-gradient(circle, transparent 22px, black 24px)"
                  : "radial-gradient(circle, transparent 14px, black 16px)",
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

        {/* Floating particles for large size */}
        {size === "lg" &&
          [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [0, Math.cos((i * 60 * Math.PI) / 180) * 80],
                y: [0, Math.sin((i * 60 * Math.PI) / 180) * 80],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>

      {showText && (
        <motion.span
          className={`font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${
            size === "lg" ? "text-3xl" : size === "md" ? "text-xl" : "text-lg"
          }`}
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
      )}
    </div>
  )
}
