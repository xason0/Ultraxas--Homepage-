"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, MessageCircle, Send, Bot } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}

const quickReplies = [
  "What is UltraXas Dev?",
  "Who is Manasseh Amoako?",
  "How do I access your bots?",
  "Tell me about your latest project",
]

const botResponses: { [key: string]: string } = {
  "what is ultraxas dev":
    "UltraXas Dev is a cutting-edge technology company founded by Manasseh Amoako, specializing in AI solutions, bots, and futuristic tools that make technology accessible to everyone.",
  "who is manasseh amoako":
    "Manasseh Amoako is the visionary founder of UltraXas Dev. He's a passionate developer and tech entrepreneur focused on creating innovative solutions that bridge complex technology with user-friendly experiences.",
  "how do i access your bots":
    "You can access our bots through various platforms including Telegram, our website, and dedicated applications. Each bot is designed for specific purposes like music streaming, file downloading, and AI assistance.",
  "tell me about your latest project":
    "Our latest projects include the UltraTube Downloader, UltraXas Store, Telegram Music Bot, and the UltraXas Assistant. Each project showcases our commitment to innovation and user experience.",
  default:
    "Thank you for your question! I'm the UltraXas Assistant. I can help you learn more about our company, projects, and services. Feel free to ask me anything about UltraXas Dev!",
}

export default function Chatbot({ isOpen, onClose, onToggle }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm the UltraXas Assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response delay
    setTimeout(() => {
      const lowerText = text.toLowerCase()
      let response = botResponses.default

      for (const [key, value] of Object.entries(botResponses)) {
        if (key !== "default" && lowerText.includes(key)) {
          response = value
          break
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={onToggle}
              size="lg"
              className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg"
              style={{
                boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)",
              }}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              className="w-full max-w-md h-[600px] md:h-[500px]"
            >
              <Card className="bg-black/90 border-purple-500/30 backdrop-blur-md h-full flex flex-col">
                <CardHeader className="flex-shrink-0 border-b border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <span>UltraXas Assistant</span>
                    </CardTitle>
                    <Button onClick={onClose} size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.isBot
                              ? "bg-purple-600/20 text-white border border-purple-500/30"
                              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-purple-600/20 text-white border border-purple-500/30 p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Replies */}
                  {messages.length === 1 && (
                    <div className="p-4 border-t border-purple-500/20">
                      <p className="text-sm text-gray-400 mb-3">Quick questions:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {quickReplies.map((reply) => (
                          <Button
                            key={reply}
                            onClick={() => handleQuickReply(reply)}
                            size="sm"
                            variant="outline"
                            className="bg-black/50 text-white border-purple-500/30 hover:bg-purple-600/20 text-left justify-start text-xs rounded-full"
                          >
                            {reply}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-purple-500/20">
                    <div className="flex space-x-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                        placeholder="Type your message..."
                        className="bg-black/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500"
                        style={{
                          boxShadow: "0 0 10px rgba(147, 51, 234, 0.2)",
                        }}
                      />
                      <Button
                        onClick={() => handleSendMessage(inputValue)}
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full w-10 h-10 p-0"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
