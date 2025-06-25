'use client'

import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { useEffect, useRef, useState } from 'react'
import {
	generateMessageId,
	playNotificationSound,
	uzbekAIPrompts,
} from '../components/chat-utils'

export function useChat() {
	const [messages, setMessages] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [soundEnabled, setSoundEnabled] = useState(true)

	const messagesEndRef = useRef(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const addMessage = (text, isUser = true) => {
		const message = {
			id: generateMessageId(),
			text,
			isUser,
			timestamp: new Date(),
			reactions: [],
		}

		setMessages(prev => [...prev, message])

		if (soundEnabled) {
			playNotificationSound(isUser ? 'notification' : 'message')
		}

		return message
	}

	const generateAIResponse = async userMessage => {
		try {
			setIsLoading(true)

			const { text } = await generateText({
				model: openai('gpt-4o'),
				system: uzbekAIPrompts.system,
				prompt: uzbekAIPrompts.getUserPrompt(userMessage),
			})

			addMessage(text, false)
		} catch (error) {
			console.error('AI Response Error:', error)
			addMessage(uzbekAIPrompts.errorMessage, false)
		} finally {
			setIsLoading(false)
		}
	}

	const sendMessage = async text => {
		if (!text.trim()) return

		// Add user message
		addMessage(text, true)

		// Generate AI response
		await generateAIResponse(text)
	}

	const addReaction = (messageId, reaction) => {
		setMessages(prev =>
			prev.map(msg =>
				msg.id === messageId
					? { ...msg, reactions: [...(msg.reactions || []), reaction] }
					: msg
			)
		)

		if (soundEnabled) {
			playNotificationSound('success')
		}
	}

	const clearMessages = () => {
		setMessages([])
	}

	return {
		messages,
		isLoading,
		soundEnabled,
		setSoundEnabled,
		sendMessage,
		addReaction,
		clearMessages,
		messagesEndRef,
	}
}
