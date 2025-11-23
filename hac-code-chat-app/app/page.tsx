"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { ChatWindow } from "@/components/chat-window"
import { ChatInput } from "@/components/chat-input"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface Chat {
  id: string
  title: string
  messages: Message[]
}

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)

  const currentChat = chats.find((chat) => chat.id === currentChatId)

  const handleNewChat = useCallback(() => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
    }
    setChats((prev) => [newChat, ...prev])
    setCurrentChatId(newChat.id)
  }, [])

  const handleSelectChat = useCallback((chatId: string) => {
    setCurrentChatId(chatId)
  }, [])

  const handleDeleteChat = useCallback(
    (chatId: string) => {
      setChats((prev) => prev.filter((chat) => chat.id !== chatId))
      if (currentChatId === chatId) {
        setCurrentChatId(null)
      }
    },
    [currentChatId],
  )

  const handleSendMessage = useCallback(
    (content: string) => {
      if (!currentChatId) return

      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === currentChatId) {
            const role = chat.messages.length % 2 === 0 ? "user" : "assistant"
            const newMessage: Message = {
              id: Date.now().toString(),
              role,
              content,
            }
            const updatedChat = {
              ...chat,
              messages: [...chat.messages, newMessage],
            }
            // Update title from first user message
            if (chat.title === "New Chat" && role === "user") {
              updatedChat.title = content.slice(0, 30)
            }
            return updatedChat
          }
          return chat
        }),
      )
    },
    [currentChatId],
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
      />
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            <ChatWindow messages={currentChat.messages} />
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#e1e7e8]">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-[#353d42] mb-2">Vibe Coding App</h1>
              <p className="text-[#6b7579] mb-6">Create a new chat to get started</p>
              <button
                onClick={handleNewChat}
                className="bg-[#258f42] hover:bg-[#1f7034] text-white rounded-lg px-6 py-3 transition-colors font-medium"
              >
                Start New Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
