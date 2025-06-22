"use client"

import { motion } from "framer-motion"

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Floating geometric shapes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        >
          {i % 3 === 0 ? (
            <div className="w-4 h-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full" />
          ) : i % 3 === 1 ? (
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rotate-45" />
          ) : (
            <div className="w-2 h-6 bg-gradient-to-b from-pink-500/20 to-purple-500/20 rounded-full" />
          )}
        </motion.div>
      ))}

      {/* Animated gradient orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-xl"
          style={{
            left: `${20 + i * 20}%`,
            top: `${20 + i * 15}%`,
            width: `${100 + Math.random() * 100}px`,
            height: `${100 + Math.random() * 100}px`,
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? "rgba(147, 51, 234, 0.1)" : "rgba(236, 72, 153, 0.1)"
            }, transparent)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
