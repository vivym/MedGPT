'use client'

import classNames from 'classnames'
import { useState, useRef, useEffect, useMemo } from 'react'
import { PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useChat } from 'ai/react'
import type { Message } from 'ai/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import locale from 'dayjs/locale/zh-cn'
import LoadingDots from '@/components/LoadingDots'

dayjs.extend(relativeTime)

export type MessageEx = {
  id: string
  role: 'user' | 'assistant' | 'system' | 'divider'
  content: string
  createdAt: Date
  typing?: boolean
}

const initialMessages: MessageEx[] = [
  {
    id: '1',
    role: 'assistant',
    content: '你好，我是智能助手，有什么可以帮助你的吗？',
    createdAt: new Date(),
  },
]

const MessageBubble: React.FC<{ message: MessageEx }> = ({ message }) => {
  if (message.role === 'divider') {
    return (
      <div className="relative my-12">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-sm text-gray-500">{message.content}</span>
        </div>
      </div>
    )
  }

  const senderAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

  const parsedDate = useMemo(() => {
    const date = dayjs(message.createdAt)
    const now = dayjs()
    if (date.isSame(now, 'hour')) {
      return date.locale(locale).fromNow()
    }
    else if (date.isSame(now, 'day')) {
      return date.format('HH:mm')
    } else if (date.isSame(now, 'year')) {
      return date.format('M月D日 HH:mm')
    } else {
      return date.format('YYYY年M月D日 HH:mm')
    }
  }, [message.createdAt])

  return (
    <div className={classNames(
      'chat',
      message.role === 'assistant' ? 'chat-start' : 'chat-end',
    )}>
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={senderAvatar} />
        </div>
      </div>
      {/* Header */}
      {message.role === 'assistant' && (
        <div className="chat-header my-1">
          智能助手
          <time className="text-xs opacity-50 ml-2">{parsedDate}</time>
        </div>
      )}

      <div className="chat-bubble">
        {message.typing && !message.content
          ? <LoadingDots />
          : <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        }
      </div>
      <div className="chat-footer opacity-50 mt-1">
        {message.role === 'assistant'
          ? (
            message.typing ? (
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></div>
                <time className="opacity-50">正在输入...</time>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></div>
                <time className="opacity-50">已完成</time>
              </div>
            )
          )
          : (
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></div>
              <time className="text-xs">{parsedDate}</time>
            </div>
          )
        }
      </div>
    </div>
  )
}

const filterToPureMessages = (messages: MessageEx[]): Message[] => {
  return (messages as Message[])
    .filter(item => item.role === 'user' || item.role === 'assistant' || item.role === 'system')
}

const getLastSessionMessages = (messages: MessageEx[]): MessageEx[] => {
  const lastSessionMessages: MessageEx[] = []
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i]
    if (message.role === 'divider') {
      break
    }
    lastSessionMessages.push(message)
  }
  return lastSessionMessages.reverse()
}

export default function ChatPage() {
  const bottomRef = useRef<HTMLLIElement>(null)
  const [historyMessages, setHistoryMessages] = useState<MessageEx[]>([])

  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: filterToPureMessages(getLastSessionMessages(initialMessages)),
  })

  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null

  const fullMessages = useMemo<MessageEx[]>(() => {
    const fullMessages = [...historyMessages, ...(messages as MessageEx[])]
    for (const message of fullMessages) {
      message.typing = false
    }
    const lastMessage = fullMessages.length > 0 ? fullMessages[fullMessages.length - 1] : null
    if (lastMessage && lastMessage.role === 'assistant') {
      lastMessage.typing = isLoading
    }
    return fullMessages
  }, [historyMessages, messages, lastMessage?.content, isLoading])

  useEffect(() => {
    if (fullMessages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [fullMessages.length, lastMessage?.content])

  return (
    <div className="flex-1 mx-8 my-8 flex">
      <div className="flex-1 mb-6 shadow-lg rounded-lg border border-gray-200 flex flex-col">
        {/* Content */}
        <div className="px-6 py-6 flex-1 flex basis-0 min-h-0 flex-col overflow-y-auto">
          <ul>
            {fullMessages.map(message => (
              <li key={message.id} className="mb-2">
                <MessageBubble message={message}  />
              </li>
            ))}
            <li ref={bottomRef}></li>
          </ul>
        </div>

        {/* Input */}
        <div className="h-44 border-t px-4 py-4">
          {/* Toolbar */}
          <div className="flex items-center">
            <button
              className="flex items-center p-2 rounded-xl border border-gray-200 hover:bg-gray-200"
              onClick={(e) => {
                e.preventDefault()

                if (isLoading) {
                  return
                }

                fullMessages.push({
                  id: `#divider-${fullMessages.length + 1}`,
                  role: 'divider',
                  content: '上下文已清除',
                  createdAt: new Date(),
                })
                setHistoryMessages(fullMessages)
                setMessages([])
              }}
            >
              <TrashIcon className="w-4 h-4 text-gray-600 mr-1" />
              <span className="text-xs text-gray-600">清空上下文</span>
            </button>
          </div>
          {/* Input */}
          <div className="flex overflow-hidden mt-2">
            <textarea
              className="p-3 pr-24 h-full w-full resize-none outline-0 block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-px focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              rows={3}
              spellCheck={false}
              placeholder="Enter发送，Shift + Enter换行输入，“/”触发命令"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e as any)
                } else if (e.key === 'Enter' && e.shiftKey) {
                  e.preventDefault()
                  // add new line
                  const textarea = e.target as HTMLTextAreaElement
                  const start = textarea.selectionStart
                  const end = textarea.selectionEnd
                  const value = textarea.value
                  textarea.value = value.substring(0, start) + '\n' + value.substring(end)
                  textarea.selectionStart = textarea.selectionEnd = start + 1
                }
              }}
            />
            <button
              type="button"
              className="group absolute right-14 bottom-20 select-none m-1 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => handleSubmit(e as any)}
            >
              <PaperAirplaneIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
