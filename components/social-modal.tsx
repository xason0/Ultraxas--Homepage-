"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Facebook, MessageCircle, Camera, Music } from "lucide-react"

interface SocialModalProps {
  isOpen: boolean
  onClose: () => void
}

const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/18s1e9kPKz/",
    icon: Facebook,
    color: "from-blue-600 to-blue-700",
    description: "Follow us on Facebook",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/447405817307",
    icon: MessageCircle,
    color: "from-green-600 to-green-700",
    description: "Chat with us on WhatsApp",
  },
  {
    name: "Snapchat",
    url: "https://www.snapchat.com/add/xasonq?share_id=9X1El13kKZw&locale=en-GB",
    icon: Camera,
    color: "from-yellow-500 to-yellow-600",
    description: "Add us on Snapchat",
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@ultraxasdev",
    icon: Music,
    color: "from-pink-600 to-red-600",
    description: "Follow us on TikTok",
  },
]

export default function SocialModal({ isOpen, onClose }: SocialModalProps) {
  const handleSocialClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="bg-black/90 border-purple-500/30 backdrop-blur-md">
              <CardHeader className="border-b border-purple-500/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-xl">Connect With Us</CardTitle>
                  <Button
                    onClick={onClose}
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white rounded-full w-8 h-8 p-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <p className="text-gray-400 mb-6 text-center">Stay connected with UltraXas Dev across all platforms</p>

                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        onClick={() => handleSocialClick(social.url)}
                        className={`w-full bg-gradient-to-r ${social.color} hover:opacity-90 text-white border-0 p-4 h-auto justify-start rounded-full`}
                        style={{
                          boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)",
                        }}
                      >
                        <social.icon className="h-6 w-6 mr-4" />
                        <div className="text-left">
                          <div className="font-semibold">{social.name}</div>
                          <div className="text-sm opacity-90">{social.description}</div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-purple-600/10 rounded-lg border border-purple-500/20">
                  <p className="text-sm text-gray-300 text-center">
                    Join our community and stay updated with the latest projects, tech insights, and exclusive content
                    from UltraXas Dev!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
