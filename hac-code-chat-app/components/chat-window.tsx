"use client"

import { useRef, useEffect } from "react"
import { ChatMessage } from "./chat-message"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatWindowProps {
  messages: Message[]
}

export function ChatWindow({ messages }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const isEmpty = messages.length === 0

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#e1e7e8]">
      {/* Messages Container */}
      <div className={`flex-1 overflow-y-auto px-4 py-6 ${isEmpty ? "flex items-center justify-center" : ""}`}>
        {isEmpty ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#353d42] mb-2">Welcome to Vibe Coding</h1>
            <p className="text-[#6b7579]">Start a conversation by typing a message below</p>
          </div>
        ) : (
          <>
            <div className="max-w-4xl mx-auto w-full">
              {messages.map((message) => (
                <ChatMessage key={message.id} role={message.role} content={message.content} />
              ))}
            </div>
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  )
}
