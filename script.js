// Global Variables
let currentTheme = "dark"
let currentBackground = "brain"
let autoTheme = false
let chatMessages = []
let isTyping = false

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeWebsite()
})

function initializeWebsite() {
  // Load saved preferences
  loadThemePreferences()
  loadBackgroundPreferences()

  // Initialize animations
  initializeBackgroundAnimation()
  initializeTypingEffect()
  initializeScrollAnimations()

  // Setup keyboard shortcuts
  setupKeyboardShortcuts()

  // Initialize chatbot
  initializeChatbot()

  console.log("UltraXas Dev website initialized successfully!")
}

// Theme Management
function loadThemePreferences() {
  const savedTheme = localStorage.getItem("ultraxas-theme")
  const savedAutoTheme = localStorage.getItem("ultraxas-auto-theme") === "true"

  if (savedTheme) {
    currentTheme = savedTheme
    applyTheme(savedTheme)
  }

  autoTheme = savedAutoTheme
  updateAutoThemeButton()

  if (autoTheme) {
    handleAutoTheme()
  }
}

function applyTheme(theme) {
  // Remove all theme classes
  document.body.classList.remove("theme-dark", "theme-light", "theme-cyberpunk", "theme-terminal")

  // Add new theme class
  document.body.classList.add(`theme-${theme}`)

  // Update theme indicator
  const indicator = document.getElementById("theme-indicator")
  const themeEmojis = {
    dark: "🌙",
    light: "☀️",
    cyberpunk: "🤖",
    terminal: "💚",
  }

  if (indicator) {
    indicator.textContent = themeEmojis[theme] || "🌙"
  }

  // Update active theme option
  document.querySelectorAll(".theme-option").forEach((option) => {
    option.classList.remove("active")
    if (option.dataset.theme === theme) {
      option.classList.add("active")
    }
  })
}

function changeTheme(theme) {
  currentTheme = theme
  applyTheme(theme)
  localStorage.setItem("ultraxas-theme", theme)

  showNotification(`Theme changed to ${getThemeName(theme)}`)
}

function getThemeName(theme) {
  const names = {
    dark: "Dark Mode 🌙",
    light: "Light Mode ☀️",
    cyberpunk: "Cyberpunk 🤖",
    terminal: "Terminal 💚",
  }
  return names[theme] || "Unknown Theme"
}

function toggleAutoTheme() {
  autoTheme = !autoTheme
  localStorage.setItem("ultraxas-auto-theme", autoTheme.toString())
  updateAutoThemeButton()

  if (autoTheme) {
    handleAutoTheme()
    showNotification("Auto-theme enabled ⏰")
  } else {
    showNotification("Auto-theme disabled")
  }
}

function updateAutoThemeButton() {
  const btn = document.getElementById("auto-theme-btn")
  if (btn) {
    btn.classList.toggle("active", autoTheme)
  }
}

function handleAutoTheme() {
  const hour = new Date().getHours()
  const newTheme = hour >= 6 && hour < 18 ? "light" : "dark"

  if (newTheme !== currentTheme) {
    changeTheme(newTheme)
  }
}

function toggleThemePanel() {
  const panel = document.getElementById("theme-panel")
  if (panel) {
    panel.classList.toggle("active")
  }
}

// Background Management
function loadBackgroundPreferences() {
  const savedBackground = localStorage.getItem("ultraxas-background")

  if (savedBackground) {
    currentBackground = savedBackground
  }

  applyBackground(currentBackground)
}

function applyBackground(background) {
  // Remove all background classes
  document.body.classList.remove("bg-brain", "bg-matrix", "bg-neural", "bg-particles")

  // Add new background class
  document.body.classList.add(`bg-${background}`)

  // Update background animation
  initializeBackgroundAnimation()

  // Update current background display
  updateCurrentBackgroundDisplay(background)

  // Update active background option
  document.querySelectorAll(".background-option").forEach((option) => {
    option.classList.remove("active")
    if (option.dataset.bg === background) {
      option.classList.add("active")
    }
  })
}

function changeBackground(background) {
  currentBackground = background
  applyBackground(background)
  localStorage.setItem("ultraxas-background", background)

  const bgInfo = getBackgroundInfo(background)
  showNotification(`${bgInfo.emoji} ${bgInfo.name}`)

  // Close background panel
  toggleBackgroundPanel()
}

function getBackgroundInfo(background) {
  const backgrounds = {
    brain: { name: "AI Brain Pulse", emoji: "🤖", description: "Glowing AI brain pulse loop" },
    matrix: { name: "Matrix Rain", emoji: "🟢", description: "Falling green binary code" },
    neural: { name: "Neural Network", emoji: "🧠", description: "AI mesh with connecting nodes" },
    particles: { name: "Particle Field", emoji: "✨", description: "Connected data network dots" },
  }
  return backgrounds[background] || backgrounds.brain
}

function updateCurrentBackgroundDisplay(background) {
  const bgInfo = getBackgroundInfo(background)
  const nameEl = document.getElementById("current-bg-name")
  const descEl = document.getElementById("current-bg-desc")
  const previewEl = document.getElementById("current-bg-preview")

  if (nameEl) nameEl.textContent = `${bgInfo.emoji} ${bgInfo.name}`
  if (descEl) descEl.textContent = bgInfo.description
  if (previewEl) {
    previewEl.className = `current-bg-preview ${background}-preview`
  }
}

function toggleBackgroundPanel() {
  const panel = document.getElementById("background-panel")
  if (panel) {
    panel.classList.toggle("active")
  }
}

// Background Animation
function initializeBackgroundAnimation() {
  const canvas = document.getElementById("background-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Animation based on current background
  switch (currentBackground) {
    case "brain":
      animateAIBrain(ctx, canvas)
      break
    case "matrix":
      animateMatrix(ctx, canvas)
      break
    case "neural":
      animateNeuralNetwork(ctx, canvas)
      break
    case "particles":
      animateParticles(ctx, canvas)
      break
    default:
      animateAIBrain(ctx, canvas)
  }
}

function animateAIBrain(ctx, canvas) {
  let time = 0

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const pulseRadius = 50 + Math.sin(time) * 30

    // Draw pulsing circles
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseRadius + i * 40, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(102, 126, 234, ${0.8 - i * 0.15})`
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Draw neural connections
    const nodeCount = 8
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + time * 0.5
      const x = centerX + Math.cos(angle) * (pulseRadius + 60)
      const y = centerY + Math.sin(angle) * (pulseRadius + 60)

      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "#f093fb"
      ctx.fill()

      // Connect to center
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.strokeStyle = "rgba(240, 147, 251, 0.5)"
      ctx.stroke()
    }

    time += 0.02
    requestAnimationFrame(animate)
  }

  animate()
}

function animateMatrix(ctx, canvas) {
  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("")
  const font_size = 10
  const columns = canvas.width / font_size
  const drops = []

  for (let x = 0; x < columns; x++) {
    drops[x] = 1
  }

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#0F0"
    ctx.font = font_size + "px monospace"

    for (let i = 0; i < drops.length; i++) {
      const text = matrix[Math.floor(Math.random() * matrix.length)]
      ctx.fillText(text, i * font_size, drops[i] * font_size)

      if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }

    requestAnimationFrame(animate)
  }

  animate()
}

function animateNeuralNetwork(ctx, canvas) {
  const nodes = []
  const nodeCount = 50

  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw nodes
    nodes.forEach((node, i) => {
      node.x += node.vx
      node.y += node.vy

      // Bounce off edges
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1

      // Draw node
      ctx.beginPath()
      ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = "#667eea"
      ctx.fill()

      // Draw connections
      nodes.slice(i + 1).forEach((otherNode) => {
        const distance = Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2))

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(otherNode.x, otherNode.y)
          ctx.strokeStyle = `rgba(102, 126, 234, ${1 - distance / 100})`
          ctx.stroke()
        }
      })
    })

    requestAnimationFrame(animate)
  }

  animate()
}

function animateParticles(ctx, canvas) {
  const particles = []
  const particleCount = 100

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
    })
  }

  function animate() {
    ctx.fillStyle = "rgba(15, 15, 35, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, i) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = "#4ecdc4"
      ctx.fill()

      // Connect nearby particles
      particles.slice(i + 1).forEach((otherParticle) => {
        const distance = Math.sqrt(
          Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2),
        )

        if (distance < 80) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.strokeStyle = `rgba(78, 205, 196, ${0.3 - distance / 240})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })
    })

    requestAnimationFrame(animate)
  }

  animate()
}

// Typing Effect
function initializeTypingEffect() {
  const typingElement = document.getElementById("typing-text")
  if (!typingElement) return

  const text = "Turning Vision into Code"
  let index = 0

  function typeText() {
    if (index < text.length) {
      typingElement.textContent = text.slice(0, index + 1)
      index++
      setTimeout(typeText, 100)
    }
  }

  setTimeout(typeText, 1500)
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe all sections and cards
  document.querySelectorAll("section, .project-card, .about-card").forEach((el) => {
    observer.observe(el)
  })
}

// Navigation Functions
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Modal Functions
function openSocialModal() {
  const modal = document.getElementById("social-modal")
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeSocialModal() {
  const modal = document.getElementById("social-modal")
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }
}

// Chatbot Functions
function initializeChatbot() {
  chatMessages = [
    {
      id: "1",
      text: "Hello! I'm the UltraXas Assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]
}

function openChatbot() {
  const chatbot = document.getElementById("chatbot")
  const chatButton = document.getElementById("chat-button")

  if (chatbot && chatButton) {
    chatbot.classList.add("active")
    chatButton.classList.add("hidden")
    document.body.style.overflow = "hidden"

    // Focus on input
    const input = document.getElementById("chatbot-input-field")
    if (input) {
      setTimeout(() => input.focus(), 300)
    }
  }
}

function closeChatbot() {
  const chatbot = document.getElementById("chatbot")
  const chatButton = document.getElementById("chat-button")

  if (chatbot && chatButton) {
    chatbot.classList.remove("active")
    chatButton.classList.remove("hidden")
    document.body.style.overflow = ""
  }
}

function sendMessage() {
  const input = document.getElementById("chatbot-input-field")
  if (!input || !input.value.trim()) return

  const message = input.value.trim()
  input.value = ""

  // Add user message
  addMessage(message, false)

  // Hide quick replies after first message
  hideQuickReplies()

  // Show typing indicator
  showTypingIndicator()

  // Simulate bot response
  setTimeout(() => {
    hideTypingIndicator()
    const response = getBotResponse(message)
    addMessage(response, true)
  }, 1500)
}

function sendQuickReply(message) {
  addMessage(message, false)
  hideQuickReplies()
  showTypingIndicator()

  setTimeout(() => {
    hideTypingIndicator()
    const response = getBotResponse(message)
    addMessage(response, true)
  }, 1500)
}

function addMessage(text, isBot) {
  const messagesContainer = document.getElementById("chatbot-messages")
  if (!messagesContainer) return

  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${isBot ? "bot-message" : "user-message"}`

  const contentDiv = document.createElement("div")
  contentDiv.className = "message-content"
  contentDiv.textContent = text

  messageDiv.appendChild(contentDiv)
  messagesContainer.appendChild(messageDiv)

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight

  // Add to messages array
  chatMessages.push({
    id: Date.now().toString(),
    text: text,
    isBot: isBot,
    timestamp: new Date(),
  })
}

function getBotResponse(message) {
  const lowerMessage = message.toLowerCase()

  const responses = {
    "what is ultraxas dev":
      "UltraXas Dev is a cutting-edge technology company founded by Manasseh Amoako, specializing in AI solutions, bots, and futuristic tools that make technology accessible to everyone.",
    "who is manasseh amoako":
      "Manasseh Amoako is the visionary founder of UltraXas Dev. He's a passionate developer and tech entrepreneur focused on creating innovative solutions that bridge complex technology with user-friendly experiences.",
    "how do i access your bots":
      "You can access our bots through various platforms including Telegram, our website, and dedicated applications. Each bot is designed for specific purposes like music streaming, file downloading, and AI assistance.",
    "tell me about your latest project":
      "Our latest projects include the UltraTube Downloader, UltraXas Store, UX'Studio, Telegram Music Bot, and the UltraXas Assistant. Each project showcases our commitment to innovation and user experience.",
  }

  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response
    }
  }

  return "Thank you for your question! I'm the UltraXas Assistant. I can help you learn more about our company, projects, and services. Feel free to ask me anything about UltraXas Dev!"
}

function showTypingIndicator() {
  const messagesContainer = document.getElementById("chatbot-messages")
  if (!messagesContainer || isTyping) return

  isTyping = true

  const typingDiv = document.createElement("div")
  typingDiv.className = "message bot-message"
  typingDiv.id = "typing-indicator"

  const contentDiv = document.createElement("div")
  contentDiv.className = "message-content typing-indicator"
  contentDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>'

  typingDiv.appendChild(contentDiv)
  messagesContainer.appendChild(typingDiv)

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator")
  if (typingIndicator) {
    typingIndicator.remove()
  }
  isTyping = false
}

function hideQuickReplies() {
  const quickReplies = document.getElementById("quick-replies")
  if (quickReplies) {
    quickReplies.style.display = "none"
  }
}

function handleChatKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage()
  }
}

// Contact Form
function handleContactSubmit(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Simulate form submission
  showNotification("Message sent successfully! 📤")

  // Reset form
  event.target.reset()

  console.log("Contact form submitted:", { name, email, message })
}

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (event) => {
    // Ctrl + T to cycle themes
    if (event.ctrlKey && event.key === "t") {
      event.preventDefault()
      cycleTheme()
    }

    // Escape to close modals
    if (event.key === "Escape") {
      closeSocialModal()
      closeChatbot()

      const themePanel = document.getElementById("theme-panel")
      const backgroundPanel = document.getElementById("background-panel")

      if (themePanel) themePanel.classList.remove("active")
      if (backgroundPanel) backgroundPanel.classList.remove("active")
    }
  })
}

function cycleTheme() {
  const themes = ["dark", "light", "cyberpunk", "terminal"]
  const currentIndex = themes.indexOf(currentTheme)
  const nextIndex = (currentIndex + 1) % themes.length
  changeTheme(themes[nextIndex])
}

// Notification System
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid rgba(147, 51, 234, 0.5);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(12px);
        box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
    `

  // Add animation styles
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `
  document.head.appendChild(style)

  document.body.appendChild(notification)

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Close panels when clicking outside
document.addEventListener("click", (event) => {
  const themePanel = document.getElementById("theme-panel")
  const backgroundPanel = document.getElementById("background-panel")
  const themeSwitcher = document.querySelector(".theme-switcher")
  const backgroundSwitcher = document.querySelector(".background-switcher")

  // Close theme panel if clicking outside
  if (themePanel && themePanel.classList.contains("active")) {
    if (!themeSwitcher.contains(event.target)) {
      themePanel.classList.remove("active")
    }
  }

  // Close background panel if clicking outside
  if (backgroundPanel && backgroundPanel.classList.contains("active")) {
    if (!backgroundSwitcher.contains(event.target)) {
      backgroundPanel.classList.remove("active")
    }
  }
})

// Auto-theme check every hour
setInterval(() => {
  if (autoTheme) {
    handleAutoTheme()
  }
}, 3600000) // 1 hour

console.log("UltraXas Dev - Static Website Loaded Successfully! 🚀")
