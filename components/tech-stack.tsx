"use client"

import { motion } from "framer-motion"
import { Code, Database, Smartphone, Bot, Cloud, Zap, Cpu, Globe } from "lucide-react"

const technologies = [
  { name: "React", icon: Code, description: "Modern UI Development", color: "from-blue-400 to-cyan-400" },
  { name: "Firebase", icon: Database, description: "Real-time Database", color: "from-orange-400 to-red-400" },
  { name: "Python", icon: Cpu, description: "AI & Backend Development", color: "from-green-400 to-emerald-400" },
  { name: "Telegram API", icon: Bot, description: "Bot Development", color: "from-blue-500 to-indigo-500" },
  { name: "Node.js", icon: Zap, description: "Server-side JavaScript", color: "from-green-500 to-lime-500" },
  { name: "Next.js", icon: Globe, description: "Full-stack React Framework", color: "from-gray-400 to-gray-600" },
  { name: "Mobile Dev", icon: Smartphone, description: "Cross-platform Apps", color: "from-purple-400 to-pink-400" },
  { name: "Cloud Services", icon: Cloud, description: "Scalable Infrastructure", color: "from-cyan-400 to-blue-400" },
]

export default function TechStack() {
  return (
    <section className="py-20 px-4">
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
              Tech Stack
            </motion.span>
          </motion.h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Cutting-edge technologies powering our innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div className="bg-black/50 border border-purple-500/20 rounded-xl p-6 text-center backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${tech.color} mb-4 shadow-lg`}>
                  <tech.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{tech.name}</h3>
                <p className="text-sm text-gray-400">{tech.description}</p>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {tech.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
