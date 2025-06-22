"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Palette, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export type BackgroundType =
  | "matrix"
  | "circuit"
  | "neural"
  | "particles"
  | "hologram"
  | "rainbow"
  | "wireframe"
  | "terminal"
  | "gold"
  | "brain"

interface BackgroundOption {
  id: BackgroundType
  name: string
  emoji: string
  description: string
  preview: string
}

const backgroundOptions: BackgroundOption[] = [
  {
    id: "matrix",
    name: "Matrix Rain",
    emoji: "🟢",
    description: "Falling green binary code",
    preview: "linear-gradient(to bottom, #000000, #001100)",
  },
  {
    id: "circuit",
    name: "Digital Circuit",
    emoji: "⚡",
    description: "Animated circuit board pattern",
    preview: "linear-gradient(45deg, #0a0a0a, #1a1a2e)",
  },
  {
    id: "neural",
    name: "Neural Network",
    emoji: "🧠",
    description: "AI mesh with connecting nodes",
    preview: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  {
    id: "particles",
    name: "Particle Field",
    emoji: "✨",
    description: "Connected data network dots",
    preview: "linear-gradient(to right, #0f0f23, #1a1a2e)",
  },
  {
    id: "hologram",
    name: "Hologram Wave",
    emoji: "🌊",
    description: "Glowing animated sine waves",
    preview: "linear-gradient(45deg, #00d4ff, #090979)",
  },
  {
    id: "rainbow",
    name: "Rainbow Gradient",
    emoji: "🌈",
    description: "Smooth flowing multi-colors",
    preview: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)",
  },
  {
    id: "wireframe",
    name: "3D Wireframe",
    emoji: "🌐",
    description: "Rotating wireframe globe",
    preview: "linear-gradient(to bottom, #000428, #004e92)",
  },
  {
    id: "terminal",
    name: "Terminal Retro",
    emoji: "💚",
    description: "CRT scanlines and green text",
    preview: "linear-gradient(to bottom, #000000, #001100)",
  },
  {
    id: "gold",
    name: "Ultraxas Gold",
    emoji: "👑",
    description: "Dark with animated gold sparks",
    preview: "linear-gradient(45deg, #000000, #1a1a00, #ffd700)",
  },
  {
    id: "brain",
    name: "AI Brain Pulse",
    emoji: "🤖",
    description: "Glowing AI brain pulse loop",
    preview: "linear-gradient(135deg, #667eea, #764ba2, #f093fb)",
  },
]

export default function BackgroundSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentBackground, setCurrentBackground] = useState<BackgroundType>("brain")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved background from localStorage
    const savedBackground = localStorage.getItem("ultraxas-background") as BackgroundType
    if (savedBackground && backgroundOptions.find((bg) => bg.id === savedBackground)) {
      setCurrentBackground(savedBackground)
      applyBackground(savedBackground)
    } else {
      applyBackground("brain")
    }
  }, [])

  const applyBackground = (backgroundId: BackgroundType) => {
    // Remove all existing background classes
    const body = document.body
    backgroundOptions.forEach((bg) => {
      body.classList.remove(`bg-${bg.id}`)
    })

    // Add new background class
    body.classList.add(`bg-${backgroundId}`)

    // Save to localStorage
    localStorage.setItem("ultraxas-background", backgroundId)

    // Dispatch custom event to notify BackgroundRenderer
    window.dispatchEvent(
      new CustomEvent("backgroundChanged", {
        detail: { background: backgroundId },
      }),
    )
  }

  const handleBackgroundChange = (backgroundId: BackgroundType) => {
    const background = backgroundOptions.find((bg) => bg.id === backgroundId)
    if (!background) return

    setCurrentBackground(backgroundId)
    applyBackground(backgroundId)
    setIsOpen(false)

    toast({
      title: `${background.emoji} ${background.name}`,
      description: background.description,
      duration: 2000,
    })
  }

  const currentBg = backgroundOptions.find((bg) => bg.id === currentBackground)

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-20 left-4 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-black hover:bg-gray-800 text-white border border-purple-500/50 shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
        >
          <Palette className="w-6 h-6 text-white" />
        </Button>
      </motion.div>

      {/* Background Switcher Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed bottom-20 left-4 w-80 bg-black/90 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-2xl z-50"
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-400" />
                  <h3 className="text-white font-semibold">Background Themes</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white rounded-full w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Current Selection */}
              <div className="p-4 border-b border-purple-500/20">
                <div className="text-sm text-gray-400 mb-2">Current Background:</div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-purple-400"
                    style={{ background: currentBg?.preview }}
                  />
                  <div>
                    <div className="text-white font-medium">
                      {currentBg?.emoji} {currentBg?.name}
                    </div>
                    <div className="text-xs text-gray-400">{currentBg?.description}</div>
                  </div>
                </div>
              </div>

              {/* Background Options */}
              <div className="p-4 max-h-80 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  {backgroundOptions.map((background) => (
                    <motion.button
                      key={background.id}
                      onClick={() => handleBackgroundChange(background.id)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                        currentBackground === background.id
                          ? "border-purple-400 bg-purple-500/20"
                          : "border-gray-600 hover:border-purple-400/50 hover:bg-purple-500/10"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-6 h-6 rounded-full border border-gray-500"
                          style={{ background: background.preview }}
                        />
                        <span className="text-lg">{background.emoji}</span>
                      </div>
                      <div className="text-white text-sm font-medium mb-1">{background.name}</div>
                      <div className="text-xs text-gray-400">{background.description}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-purple-500/20">
                <div className="text-xs text-gray-400 text-center">Background persists across sessions</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
