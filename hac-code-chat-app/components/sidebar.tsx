"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

interface Chat {
  id: string
  title: string
  messages: Array<{
    id: string
    role: "user" | "assistant"
    content: string
  }>
}

interface SidebarProps {
  chats: Chat[]
  currentChatId: string | null
  onNewChat: () => void
  onSelectChat: (chatId: string) => void
  onDeleteChat: (chatId: string) => void
}

export function Sidebar({ chats, currentChatId, onNewChat, onSelectChat, onDeleteChat }: SidebarProps) {
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null)

  return (
    <div className="w-64 bg-[#353d42] text-[#e1e7e8] flex flex-col h-screen border-r border-[#4a5560]">
      {/* New Chat Button */}
      <div className="p-4 border-b border-[#4a5560]">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-[#258f42] hover:bg-[#1f7034] text-white rounded-lg py-2 px-4 transition-colors font-medium"
        >
          <Plus size={20} />
          New Chat
        </button>
      </div>

      {/* Chats List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onMouseEnter={() => setHoveredChatId(chat.id)}
            onMouseLeave={() => setHoveredChatId(null)}
            onClick={() => onSelectChat(chat.id)}
            className={`p-3 mx-2 my-1 rounded-lg cursor-pointer transition-colors group ${
              currentChatId === chat.id ? "bg-[#258f42] text-white" : "hover:bg-[rgba(255,255,255,0.08)]"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="flex-1 truncate text-sm">{chat.title}</p>
              {hoveredChatId === chat.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteChat(chat.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
