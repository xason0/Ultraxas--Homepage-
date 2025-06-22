"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative py-12 px-4 border-t border-purple-500/20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 mb-6"
            style={{
              textShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
            }}
          >
            ©️ 2025 UltraXas Dev – Built to Inspire
          </motion.p>

          {/* Scroll to top button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={scrollToTop}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full w-14 h-14 p-0"
              style={{
                boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)",
              }}
            >
              <ArrowUp className="h-6 w-6" />
            </Button>
          </motion.div>

          {/* Additional footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 mt-4"
          >
            Turning Vision into Code • Making Technology Beautiful
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
