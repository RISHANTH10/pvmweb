'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_PROMPT = `You are a friendly and helpful AI assistant for Prasan Vidya Bala Mandir, a school in Chengalpattu, Tamil Nadu. 
Answer questions about the school warmly and concisely. Topics you can help with:
- Admissions process and age criteria
- School timings and academic calendar
- Curriculum and programmes offered
- Faculty and staff information
- Facilities and infrastructure
- Events and extracurricular activities
- Fee structure enquiries (direct to office for exact details)
- Contact and location details

Always be warm, encouraging, and professional. Keep responses brief and clear. If you don't have specific information, politely suggest contacting the school office directly.`

export default function SchoolChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m the Prasan Vidya assistant. How can I help you today? 😊',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [messages, isOpen])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMessage: Message = { role: 'user', content: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()
      const reply = data.content?.[0]?.text ?? 'Sorry, I could not get a response. Please try again.'
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again or contact the school office directly.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className={`fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3 ${poppins.className}`}>

      {/* Chat Window */}
      <div
        className={`
          flex flex-col bg-white rounded-2xl border border-gray-200 shadow-2xl
          w-[340px] sm:w-[380px]
          transition-all duration-300 origin-bottom-right overflow-hidden
          ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
        `}
        style={{ height: isOpen ? '480px' : '0px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-orange-200 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Prasan Vidya"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 leading-tight truncate">Prasan Vidya Assistant</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
              <p className="text-[11px] text-gray-400">Online · Ask me anything</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors flex-shrink-0"
            aria-label="Close chat"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-1 border border-orange-100">
                  <Image src="/images/logo.png" alt="" fill className="object-cover" />
                </div>
              )}
              <div
                className={`
                  max-w-[75%] px-3 py-2 rounded-2xl text-[13px] leading-relaxed
                  ${msg.role === 'user'
                    ? 'bg-orange-500 text-white rounded-tr-sm'
                    : 'bg-gray-100 text-gray-700 rounded-tl-sm'
                  }
                `}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-2 justify-start">
              <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-1 border border-orange-100">
                <Image src="/images/logo.png" alt="" fill className="object-cover" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-3 pb-3 pt-2 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 focus-within:border-orange-300 focus-within:bg-white transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question…"
              className="flex-1 bg-transparent text-[13px] text-gray-700 placeholder-gray-400 outline-none"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-orange-500 text-white flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-600 active:scale-95 transition-all"
              aria-label="Send message"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 12L12 6.5 1 1v4.5l7 2-7 2V12z" fill="currentColor" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[10px] text-gray-300 mt-1.5">Powered by AI · Prasan Vidya Bala Mandir</p>
        </div>
      </div>

      {/* FAB Trigger Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative w-14 h-14 rounded-full bg-white shadow-lg overflow-hidden active:scale-95 transition-all duration-200 flex-shrink-0"
        aria-label="Open school chat assistant"
      >
        <Image
          src="/images/logo.png"
          alt="Chat with Prasan Vidya"
          fill
          className="object-cover"
        />
        {/* Pulse ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full ring-4 ring-orange-300 animate-ping opacity-40 pointer-events-none" />
        )}
        {/* Unread dot */}
        
      </button>
    </div>
  )
}