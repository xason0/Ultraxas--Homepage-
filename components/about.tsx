"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Target, Eye, User } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-4">
            <motion.span
              className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
                backgroundImage: "linear-gradient(45deg, #a855f7, #ec4899, #06b6d4, #a855f7)",
              }}
            >
              About UltraXas Dev
            </motion.span>
          </motion.h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Founded by Manasseh Amoako, we're on a mission to create the future of technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/50 border-purple-500/20 backdrop-blur-sm h-full">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="h-8 w-8 text-purple-400" />
                  <h3 className="text-2xl font-bold text-white">Founder</h3>
                </div>
                <h4 className="text-xl font-semibold text-purple-300 mb-4">Manasseh Amoako</h4>
                <p className="text-gray-300 leading-relaxed">
                  Visionary developer and tech entrepreneur passionate about creating innovative solutions that bridge
                  the gap between complex technology and user-friendly experiences. Leading UltraXas Dev since 2025 with
                  a focus on AI, automation, and cutting-edge development.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/50 border-purple-500/20 backdrop-blur-sm h-full">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Calendar className="h-8 w-8 text-pink-400" />
                  <h3 className="text-2xl font-bold text-white">Timeline</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-purple-300 font-semibold">2025</span>
                    <span className="text-gray-300">Founded UltraXas Dev</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    <span className="text-pink-300 font-semibold">Present</span>
                    <span className="text-gray-300">Building the future of tech</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/50 border-purple-500/20 backdrop-blur-sm h-full">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="h-8 w-8 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white">Mission</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  To democratize advanced technology by creating bots, AI solutions, and futuristic tools that are
                  accessible to everyone. We believe in making complex technology simple, beautiful, and powerful for
                  users worldwide.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/50 border-purple-500/20 backdrop-blur-sm h-full">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Eye className="h-8 w-8 text-emerald-400" />
                  <h3 className="text-2xl font-bold text-white">Vision</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  To be at the forefront of technological innovation, creating solutions that not only solve today's
                  problems but anticipate tomorrow's needs. We envision a world where technology seamlessly integrates
                  with human creativity and potential.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
