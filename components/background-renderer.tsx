"use client"

import { useEffect, useState, useRef } from "react"

const backgrounds = {
  matrix: "Matrix Rain",
  circuit: "Digital Circuit",
  neural: "Neural Network",
  particle: "Particle Field",
  hologram: "Hologram Wave",
  rainbow: "Rainbow Gradient",
  wireframe: "3D Wireframe",
  terminal: "Terminal Retro",
  gold: "Ultraxas Gold",
  brain: "AI Brain Pulse",
}

export default function BackgroundRenderer() {
  const [currentBackground, setCurrentBackground] = useState("matrix")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    // Load saved background
    const saved = localStorage.getItem("ultraxas-background")
    if (saved && backgrounds[saved as keyof typeof backgrounds]) {
      setCurrentBackground(saved)
    }

    // Listen for background changes
    const handleBackgroundChange = (event: CustomEvent) => {
      setCurrentBackground(event.detail.background)
    }

    window.addEventListener("backgroundChanged", handleBackgroundChange as EventListener)
    return () => window.removeEventListener("backgroundChanged", handleBackgroundChange as EventListener)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    // Apply CSS background for non-canvas backgrounds
    document.body.className = document.body.className.replace(/bg-\w+/g, "")

    if (["circuit", "rainbow", "wireframe", "terminal", "gold"].includes(currentBackground)) {
      document.body.classList.add(`bg-${currentBackground}`)
      canvas.style.display = "none"
      return
    } else {
      canvas.style.display = "block"
    }

    // Canvas-based animations
    let particles: any[] = []
    let animationId: number

    const initAnimation = () => {
      switch (currentBackground) {
        case "matrix":
          initMatrixRain()
          break
        case "neural":
          initNeuralNetwork()
          break
        case "particle":
          initParticleField()
          break
        case "hologram":
          initHologramWave()
          break
        case "brain":
          initAIBrainPulse()
          break
        default:
          break
      }
    }

    const initMatrixRain = () => {
      const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
      const fontSize = 14
      const columns = Math.floor(canvas.width / fontSize)
      const drops: number[] = Array(columns).fill(1)

      const animate = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "#0F0"
        ctx.font = `${fontSize}px monospace`

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)]
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }

        animationId = requestAnimationFrame(animate)
      }
      animate()
    }

    const initNeuralNetwork = () => {
      particles = []
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
        })
      }

      const animate = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        particles.forEach((particle) => {
          particle.x += particle.vx
          particle.y += particle.vy

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = "#00ffff"
          ctx.fill()
        })

        // Draw connections
        ctx.strokeStyle = "rgba(0, 255, 255, 0.2)"
        ctx.lineWidth = 1
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }

        animationId = requestAnimationFrame(animate)
      }
      animate()
    }

    const initParticleField = () => {
      particles = []
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 2 + 1,
        })
      }

      const animate = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        particles.forEach((particle) => {
          particle.x += particle.vx
          particle.y += particle.vy

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = "#a855f7"
          ctx.fill()
        })

        // Draw connections
        ctx.strokeStyle = "rgba(168, 85, 247, 0.3)"
        ctx.lineWidth = 0.5
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 80) {
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[j].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }

        animationId = requestAnimationFrame(animate)
      }
      animate()
    }

    const initHologramWave = () => {
      let time = 0

      const animate = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = "#00ffff"
        ctx.lineWidth = 2

        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          for (let x = 0; x < canvas.width; x += 5) {
            const y = canvas.height / 2 + Math.sin((x + time + i * 50) * 0.01) * (50 + i * 20)
            if (x === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.stroke()
        }

        time += 2
        animationId = requestAnimationFrame(animate)
      }
      animate()
    }

    const initAIBrainPulse = () => {
      particles = []
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2
        particles.push({
          x: centerX + Math.cos(angle) * 100,
          y: centerY + Math.sin(angle) * 100,
          angle: angle,
          pulse: 0,
        })
      }

      const animate = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw center pulse
        const pulseSize = 20 + Math.sin(Date.now() * 0.005) * 10
        ctx.beginPath()
        ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = "#ff6b6b"
        ctx.fill()

        // Draw rotating nodes
        particles.forEach((particle, i) => {
          particle.angle += 0.01
          particle.x = centerX + Math.cos(particle.angle) * 100
          particle.y = centerY + Math.sin(particle.angle) * 100

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2)
          ctx.fillStyle = "#4ecdc4"
          ctx.fill()

          // Draw connections to center
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(particle.x, particle.y)
          ctx.strokeStyle = "rgba(78, 205, 196, 0.5)"
          ctx.lineWidth = 1
          ctx.stroke()
        })

        animationId = requestAnimationFrame(animate)
      }
      animate()
    }

    initAnimation()
    animationRef.current = animationId

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [currentBackground])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: -1,
        background: "transparent",
      }}
    />
  )
}
