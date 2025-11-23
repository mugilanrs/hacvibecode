"use client"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-lg ${
          isUser ? "bg-[#258f42] text-white rounded-br-none" : "bg-white text-[#353d42] rounded-bl-none"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  )
}
