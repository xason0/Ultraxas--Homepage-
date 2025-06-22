"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Palette,
  Moon,
  Sun,
  Zap,
  Cpu,
  Monitor,
  Terminal,
  Crown,
  Snowflake,
  Leaf,
  Flame,
  ChevronUp,
  Clock,
} from "lucide-react"

interface Theme {
  id: string
  name: string
  icon: React.ReactNode
  emoji: string
  description: string
}

const themes: Theme[] = [
  {
    id: "dark",
    name: "Dark Mode",
    icon: <Moon className="w-4 h-4" />,
    emoji: "🌙",
    description: "Deep black with neon accents",
  },
  {
    id: "light",
    name: "Light Mode",
    icon: <Sun className="w-4 h-4" />,
    emoji: "☀️",
    description: "Clean white with soft shadows",
  },
  {
    id: "rainbow",
    name: "Rainbow Live",
    icon: <Zap className="w-4 h-4" />,
    emoji: "🌈",
    description: "Animated rainbow gradients",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Neon",
    icon: <Cpu className="w-4 h-4" />,
    emoji: "🤖",
    description: "Purple/pink glow, circuit style",
  },
  {
    id: "amoled",
    name: "AMOLED Black",
    icon: <Monitor className="w-4 h-4" />,
    emoji: "⚫",
    description: "Pure black, high contrast",
  },
  {
    id: "terminal",
    name: "Retro Terminal",
    icon: <Terminal className="w-4 h-4" />,
    emoji: "💚",
    description: "Green-on-black matrix style",
  },
  {
    id: "gold",
    name: "Ultraxas Gold",
    icon: <Crown className="w-4 h-4" />,
    emoji: "👑",
    description: "Black with golden accents",
  },
  {
    id: "ice",
    name: "Ice Blue",
    icon: <Snowflake className="w-4 h-4" />,
    emoji: "❄️",
    description: "Cool tones, glassmorphism",
  },
  {
    id: "nature",
    name: "Nature Green",
    icon: <Leaf className="w-4 h-4" />,
    emoji: "🌿",
    description: "Soft greens, eco-friendly",
  },
  {
    id: "fire",
    name: "Fire Red",
    icon: <Flame className="w-4 h-4" />,
    emoji: "🔥",
    description: "Red/orange gradients, fiery",
  },
]

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState("dark")
  const [autoSwitch, setAutoSwitch] = useState(false)
  const { toast } = useToast()

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("ultraxas-theme")
    const savedAutoSwitch = localStorage.getItem("ultraxas-auto-switch") === "true"

    if (savedTheme) {
      setCurrentTheme(savedTheme)
      applyTheme(savedTheme)
    }

    setAutoSwitch(savedAutoSwitch)

    if (savedAutoSwitch) {
      handleAutoSwitch()
    }
  }, [])

  // Auto-switch based on time of day
  const handleAutoSwitch = () => {
    const hour = new Date().getHours()
    const newTheme = hour >= 6 && hour < 18 ? "light" : "dark"

    if (newTheme !== currentTheme) {
      changeTheme(newTheme)
    }
  }

  // Apply theme to document
  const applyTheme = (themeId: string) => {
    // Remove all theme classes
    const themeClasses = themes.map((t) => `theme-${t.id}`)
    document.documentElement.classList.remove(...themeClasses)

    // Add new theme class
    document.documentElement.classList.add(`theme-${themeId}`)
  }

  // Change theme function
  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId)
    applyTheme(themeId)
    localStorage.setItem("ultraxas-theme", themeId)

    const theme = themes.find((t) => t.id === themeId)
    if (theme) {
      toast({
        title: `Theme changed to ${theme.name} ${theme.emoji}`,
        description: theme.description,
        duration: 2000,
      })
    }
  }

  // Toggle auto-switch
  const toggleAutoSwitch = () => {
    const newAutoSwitch = !autoSwitch
    setAutoSwitch(newAutoSwitch)
    localStorage.setItem("ultraxas-auto-switch", newAutoSwitch.toString())

    if (newAutoSwitch) {
      handleAutoSwitch()
      toast({
        title: "Auto-switch enabled ⏰",
        description: "Theme will change based on time of day",
        duration: 2000,
      })
    } else {
      toast({
        title: "Auto-switch disabled",
        description: "Manual theme control restored",
        duration: 2000,
      })
    }
  }

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "t") {
        e.preventDefault()
        const currentIndex = themes.findIndex((t) => t.id === currentTheme)
        const nextIndex = (currentIndex + 1) % themes.length
        changeTheme(themes[nextIndex].id)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentTheme])

  const currentThemeData = themes.find((t) => t.id === currentTheme)

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-black/90 backdrop-blur-md border border-purple-500/20 rounded-2xl p-4 w-80 max-h-96 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Choose Theme</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleAutoSwitch}
                className={`text-xs ${autoSwitch ? "text-purple-400" : "text-gray-400"} hover:text-purple-300`}
              >
                <Clock className="w-3 h-3 mr-1" />
                Auto
              </Button>
            </div>

            {/* Theme Grid */}
            <div className="grid grid-cols-2 gap-2">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => changeTheme(theme.id)}
                  className={`p-3 rounded-xl border transition-all duration-200 ${
                    currentTheme === theme.id
                      ? "border-purple-400 bg-purple-500/20"
                      : "border-gray-600 bg-gray-800/50 hover:border-purple-500/50"
                  }`}
                >
                  <div
                    className={`w-full h-8 rounded-lg mb-2 bg-gradient-to-r ${
                      theme.id === "dark"
                        ? "from-gray-900 to-purple-900"
                        : theme.id === "light"
                          ? "from-white to-gray-100"
                          : theme.id === "rainbow"
                            ? "from-purple-500 via-pink-500 to-cyan-500"
                            : theme.id === "cyberpunk"
                              ? "from-purple-600 to-pink-600"
                              : theme.id === "amoled"
                                ? "from-black to-gray-800"
                                : theme.id === "terminal"
                                  ? "from-black to-green-900"
                                  : theme.id === "gold"
                                    ? "from-black to-yellow-600"
                                    : theme.id === "ice"
                                      ? "from-blue-100 to-cyan-200"
                                      : theme.id === "nature"
                                        ? "from-green-100 to-emerald-200"
                                        : "from-red-500 to-orange-500"
                    }`}
                  />
                  <div className="flex items-center space-x-2">
                    {theme.icon}
                    <span className="text-sm font-medium text-white truncate">{theme.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Keyboard shortcut hint */}
            <div className="mt-4 text-xs text-gray-400 text-center">Press Ctrl + T to cycle themes</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="w-14 h-14 rounded-full bg-black hover:bg-gray-800 text-white border border-purple-500/50 shadow-lg"
          style={{
            boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)",
          }}
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            {isOpen ? <ChevronUp className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
          </motion.div>
        </Button>
      </motion.div>

      {/* Current theme indicator */}
      {currentThemeData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black/80 border border-purple-400 flex items-center justify-center text-xs"
        >
          {currentThemeData.emoji}
        </motion.div>
      )}
    </div>
  )
}
