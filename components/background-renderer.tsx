"use client"

import { useEffect, useState } from "react"
import { MatrixRain, NeuralNetwork, ParticleField, HologramWave, AIBrainPulse } from "./animated-backgrounds"
import type { BackgroundType } from "./background-switcher"

export function BackgroundRenderer() {
  const [currentBackground, setCurrentBackground] = useState<BackgroundType>("matrix")

  useEffect(() => {
    // Load saved background from localStorage
    const savedBackground = localStorage.getItem("ultraxas-background") as BackgroundType
    if (savedBackground) {
      setCurrentBackground(savedBackground)
    }

    // Listen for background changes
    const handleBackgroundChange = (event: CustomEvent) => {
      setCurrentBackground(event.detail.background)
    }

    // Listen for the custom event
    window.addEventListener("backgroundChanged", handleBackgroundChange as EventListener)

    return () => {
      window.removeEventListener("backgroundChanged", handleBackgroundChange as EventListener)
    }
  }, [])

  const renderBackground = () => {
    switch (currentBackground) {
      case "matrix":
        return <MatrixRain />
      case "neural":
        return <NeuralNetwork />
      case "particles":
        return <ParticleField />
      case "hologram":
        return <HologramWave />
      case "brain":
        return <AIBrainPulse />
      default:
        return null
    }
  }

  return <>{renderBackground()}</>
}
