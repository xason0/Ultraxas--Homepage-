"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Download, Music, Bot, Store, Palette } from "lucide-react"

const projects = [
  {
    title: "UltraTube Downloader",
    description: "Advanced YouTube video and audio downloader with multiple format support",
    icon: Download,
    tags: ["Python", "GUI", "Media Processing"],
    liveDemo: "#",
    github: "#",
    color: "from-red-500 to-pink-500",
  },
  {
    title: "UltraXas Store",
    description: "Modern e-commerce platform with AI-powered recommendations",
    icon: Store,
    tags: ["React", "Node.js", "AI"],
    liveDemo: "#",
    github: "#",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "UX'Studio",
    description: "Professional UI/UX design studio with modern design tools and templates",
    icon: Palette,
    tags: ["Design", "UI/UX", "Creative"],
    liveDemo: "#",
    github: "#",
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Telegram Music Bot",
    description: "Intelligent music bot for Telegram with playlist management",
    icon: Music,
    tags: ["Python", "Telegram API", "Music"],
    liveDemo: "#",
    github: "#",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "UltraXas Assistant",
    description: "AI-powered virtual assistant with natural language processing",
    icon: Bot,
    tags: ["AI", "NLP", "Chatbot"],
    liveDemo: "#",
    github: "#",
    color: "from-purple-500 to-pink-500",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 relative z-10">
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
              Featured Projects
            </motion.span>
          </motion.h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Cutting-edge solutions that push the boundaries of technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group relative z-20"
            >
              <Card className="bg-black/50 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 h-full relative z-20">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${project.color} shadow-lg`}>
                      <project.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{project.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-300 text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-purple-600/20 text-purple-300 rounded-full border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      onClick={() => window.open(project.liveDemo, "_blank")}
                      className="bg-black hover:bg-gray-800 text-white border border-purple-500/50 flex-1 rounded-full relative z-30 cursor-pointer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => window.open(project.github, "_blank")}
                      className="bg-black hover:bg-gray-800 text-white border border-purple-500/50 flex-1 rounded-full relative z-30 cursor-pointer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
