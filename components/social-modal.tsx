"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ExternalLink, MessageCircle, Download, ShoppingBag, Palette } from "lucide-react"

interface SocialModalProps {
  isOpen: boolean
  onClose: () => void
}

const socialLinks = [
  {
    name: "Scan Session",
    description: "Connect with our AI assistant",
    icon: MessageCircle,
    url: "https://t.me/UltraXas_bot",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Download Bot",
    description: "Get files and media instantly",
    icon: Download,
    url: "https://t.me/UltraTube_Downloader_bot",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Visit Store",
    description: "Explore our digital products",
    icon: ShoppingBag,
    url: "https://ultraxas-store.vercel.app",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "UX Studio",
    description: "Professional design services",
    icon: Palette,
    url: "https://ux-studio-ultraxas.vercel.app",
    color: "from-orange-500 to-red-500",
  },
]

export default function SocialModal({ isOpen, onClose }: SocialModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
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
                <CardTitle className="text-white">Connect With UltraXas</CardTitle>
                <Button onClick={onClose} size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`p-4 rounded-lg bg-gradient-to-r ${link.color} bg-opacity-10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${link.color}`}>
                          <link.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{link.name}</h3>
                          <p className="text-gray-400 text-sm">{link.description}</p>
                        </div>
                        <ExternalLink className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
