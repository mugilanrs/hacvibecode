"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input
    setInput("")
    setIsLoading(true)

    // Send user message
    onSendMessage(userMessage)

    // Simulate assistant response
    setTimeout(() => {
      const responses = [
        "That's a great question! Here's what I think...",
        "I can help you with that. Let me explain...",
        "Interesting! Here's my perspective on that...",
        "Good point! Consider this approach...",
        "I understand. Here are some suggestions...",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      onSendMessage(randomResponse)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="sticky bottom-0 w-full bg-white border-t border-[#d0d4d6] p-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Message Vibe Coding..."
          className="flex-1 bg-[#f0f2f4] border border-[#d0d4d6] rounded-lg px-4 py-3 text-[#353d42] placeholder-[#6b7579] focus:outline-none focus:ring-2 focus:ring-[#258f42] disabled:opacity-50 transition-all"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-[#258f42] hover:bg-[#1f7034] disabled:bg-[#b0b8c0] text-white rounded-lg px-4 py-3 transition-colors flex items-center justify-center"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  )
}
