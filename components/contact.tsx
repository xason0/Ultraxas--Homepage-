"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, MessageSquare, User } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
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
              Get In Touch
            </motion.span>
          </motion.h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's start a conversation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-black/50 border-purple-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center space-x-3">
                <Mail className="h-6 w-6 text-purple-400" />
                <span>Send us a message</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="pl-12 bg-black/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                    style={{
                      boxShadow: "0 0 10px rgba(147, 51, 234, 0.2)",
                    }}
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-12 bg-black/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                    style={{
                      boxShadow: "0 0 10px rgba(147, 51, 234, 0.2)",
                    }}
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="pl-12 bg-black/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 resize-none"
                    style={{
                      boxShadow: "0 0 10px rgba(147, 51, 234, 0.2)",
                    }}
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 py-4 text-lg rounded-full"
                    style={{
                      boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)",
                    }}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
