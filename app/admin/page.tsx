"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Settings, FileText, Palette, Eye, Save, Upload, ExternalLink, Globe } from "lucide-react"

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("content")

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("ultraxas-admin-auth")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "4933") {
      setIsAuthenticated(true)
      localStorage.setItem("ultraxas-admin-auth", "authenticated")
      setError("")
    } else {
      setError("Invalid password. Please try again.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("ultraxas-admin-auth")
    setPassword("")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
          <Card className="bg-gray-900 border-purple-500/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">UltraXas Admin Panel</CardTitle>
              <p className="text-gray-400">Enter password to access dashboard</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black border-purple-500/30 text-white"
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm">
                    {error}
                  </motion.p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white border border-purple-500/30"
                >
                  Login to Dashboard
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">UltraXas Admin Panel</h1>
              <p className="text-sm text-gray-400">Manage your homepage content</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => window.open("/", "_blank")}
              variant="outline"
              size="sm"
              className="bg-black hover:bg-gray-800 text-white border-purple-500/30"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Site
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="bg-black hover:bg-gray-800 text-white border-red-500/30 hover:border-red-500"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-gray-900 border border-purple-500/20">
            <TabsTrigger value="content" className="data-[state=active]:bg-black">
              <FileText className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-black">
              <Image className="w-4 h-4 mr-2" />
              Media
            </TabsTrigger>
            <TabsTrigger value="theme" className="data-[state=active]:bg-black">
              <Palette className="w-4 h-4 mr-2" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="links" className="data-[state=active]:bg-black">
              <ExternalLink className="w-4 h-4 mr-2" />
              Links
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-black">
              <Globe className="w-4 h-4 mr-2" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-black">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Content Management */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hero Section */}
              <Card className="bg-gray-900 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Main Title</Label>
                    <Input defaultValue="UltraXas Dev" className="bg-black border-purple-500/30 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Typing Animation Text</Label>
                    <Input
                      defaultValue="Turning Vision into Code"
                      className="bg-black border-purple-500/30 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">CTA Button 1 Text</Label>
                    <Input defaultValue="Explore Projects" className="bg-black border-purple-500/30 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">CTA Button 2 Text</Label>
                    <Input defaultValue="Chat with Assistant" className="bg-black border-purple-500/30 text-white" />
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card className="bg-gray-900 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">About Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Founder Name</Label>
                    <Input defaultValue="Manasseh Amoako" className="bg-black border-purple-500/30 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Company Description</Label>
                    <Textarea
                      defaultValue="UltraXas Dev is a cutting-edge technology company specializing in AI solutions, bots, and futuristic tools."
                      className="bg-black border-purple-500/30 text-white"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Projects Section */}
              <Card className="bg-gray-900 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Featured Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Project 1: UltraTube Downloader</Label>
                    <Input
                      defaultValue="Advanced YouTube video and audio downloader"
                      className="bg-black border-purple-500/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Project 2: UltraXas Store</Label>
                    <Input
                      defaultValue="Modern e-commerce platform with AI recommendations"
                      className="bg-black border-purple-500/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Project 3: UX'Studio</Label>
                    <Input
                      defaultValue="Professional UI/UX design studio"
                      className="bg-black border-purple-500/30 text-white"
                    />
                  </div>
                  <Button className="bg-black hover:bg-gray-800 text-white border border-purple-500/30">
                    Add New Project
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Section */}
              <Card className="bg-gray-900 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Contact Email</Label>
                    <Input defaultValue="ultradev@gmail.com" className="bg-black border-purple-500/30 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Contact Form Title</Label>
                    <Input defaultValue="Get In Touch" className="bg-black border-purple-500/30 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Contact Description</Label>
                    <Textarea
                      defaultValue="Ready to bring your vision to life? Let's start a conversation"
                      className="bg-black border-purple-500/30 text-white"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Media Management */}
          <TabsContent value="media" className="space-y-6">
            <Card className="bg-gray-900 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Media Library</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-white mb-2">Drag and drop files here</p>
                  <p className="text-gray-400 text-sm mb-4">or click to browse</p>
                  <Button className="bg-black hover:bg-gray-800 text-white border border-purple-500/30">
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theme Customization */}
          <TabsContent value="theme" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Color Scheme</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Primary Color</Label>
                    <Input type="color" defaultValue="#a855f7" className="bg-black border-purple-500/30 h-12" />
                  </div>
                  <div>
                    <Label className="text-white">Secondary Color</Label>
                    <Input type="color" defaultValue="#ec4899" className="bg-black border-purple-500/30 h-12" />
                  </div>
                  <div>
                    <Label className="text-white">Accent Color</Label>
                    <Input type="color" defaultValue="#06b6d4" className="bg-black border-purple-500/30 h-12" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Background Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Default Background</Label>
                    <select className="w-full bg-black border border-purple-500/30 text-white p-2 rounded">
                      <option value="matrix">Matrix Rain</option>
                      <option value="circuit">Digital Circuit</option>
                      <option value="neural">Neural Network</option>
                      <option value="particles">Particle Field</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-white">Animation Speed</Label>
                    <Input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      defaultValue="1"
                      className="bg-black border-purple-500/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* External Links */}
          <TabsContent value="links" className="space-y-6">
            <Card className="bg-gray-900 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">External Links Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Scan Session URL</Label>
                    <Input
                      placeholder="https://scan.ultraxas.com"
                      className="bg-black border-purple-500/30 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Download Bot URL</Label>
                    <Input
                      placeholder="https://bot.ultraxas.com"
                      className="bg-black border-purple-500/30 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Visit Store URL</Label>
                    <Input
                      placeholder="https://store.ultraxas.com"
                      className="bg-black border-purple-500/30 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">UX Studio URL</Label>
                    <Input placeholder="https://ux.ultraxas.com" className="bg-black border-purple-500/30 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Settings */}
          <TabsContent value="seo" className="space-y-6">
            <Card className="bg-gray-900 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">SEO & Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Page Title</Label>
                  <Input
                    defaultValue="UltraXas Dev - Turning Vision into Code"
                    className="bg-black border-purple-500/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Meta Description</Label>
                  <Textarea
                    defaultValue="UltraXas Dev is a cutting-edge technology company specializing in AI solutions, bots, and futuristic tools."
                    className="bg-black border-purple-500/30 text-white"
                    rows={3}
                  />
                </div>
                <div>
                  <Label className="text-white">Keywords</Label>
                  <Input
                    defaultValue="UltraXas, AI, bots, technology, development"
                    className="bg-black border-purple-500/30 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-900 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="maintenance" className="rounded" />
                  <Label htmlFor="maintenance" className="text-white">
                    Maintenance Mode
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="analytics" className="rounded" defaultChecked />
                  <Label htmlFor="analytics" className="text-white">
                    Enable Analytics
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="animations" className="rounded" defaultChecked />
                  <Label htmlFor="animations" className="text-white">
                    Enable Animations
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save & Publish Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="bg-black hover:bg-gray-800 text-white border border-green-500/50 hover:border-green-500 shadow-lg"
          >
            <Save className="w-5 h-5 mr-2" />
            Save & Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
