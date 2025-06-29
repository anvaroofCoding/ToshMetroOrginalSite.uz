'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
	Bot,
	MessageCircle,
	Send,
	Sparkles,
	Volume2,
	VolumeX,
	X,
} from 'lucide-react'
import { useEffect, useRef, useState, useTransition } from 'react'

// Server action for AI responses (you'll need to implement this)
async function generateAIResponse(userMessage) {
	try {
		const response = await fetch('/api/chat', {
			// TO'G'RI YO'L
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: userMessage }),
		})

		if (!response.ok) {
			throw new Error(`Server error: ${response.status}`)
		}

		const data = await response.json()

		if (data.success) {
			return {
				success: true,
				message: data.message,
			}
		} else {
			throw new Error(data.error || 'Failed to get AI response')
		}
	} catch (error) {
		console.error('AI Response Error:', error)
		return {
			success: false,
			message:
				"Kechirasiz, hozir javob bera olmayman. Keyinroq urinib ko'ring.",
		}
	}
}

const quickReplies = [
	'Salom! 👋',
	'Yordam kerak',
	'Rahmat! 🙏',
	'Xayr! 👋',
	'Qanday hollar?',
	'Tushundim ✅',
]

const reactionCategories = {
	emotions: ['😊', '😂', '😍', '🥰', '😎', '🤔'],
	gestures: ['👍', '👎', '👏', '🙌', '👋', '🤝'],
	symbols: ['❤️', '🔥', '⭐', '✨', '💯', '🎉'],
}

export default function AIFloatingChat() {
	const [isOpen, setIsOpen] = useState(false)
	const [messages, setMessages] = useState([])
	const [input, setInput] = useState('')
	const [isPending, startTransition] = useTransition()
	const [alert, setAlert] = useState(false)
	const [soundEnabled, setSoundEnabled] = useState(true)
	const [showReactions, setShowReactions] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState('emotions')

	const messagesEndRef = useRef(null)
	const chatRef = useRef(null)

	const playSound = (frequency = 800) => {
		if (!soundEnabled) return
		try {
			const context = new (window.AudioContext || window.webkitAudioContext)()
			const oscillator = context.createOscillator()
			const gainNode = context.createGain()

			oscillator.connect(gainNode)
			gainNode.connect(context.destination)

			oscillator.frequency.value = frequency
			oscillator.type = 'sine'

			gainNode.gain.setValueAtTime(0.1, context.currentTime)
			gainNode.gain.exponentialRampToValueAtTime(
				0.01,
				context.currentTime + 0.2
			)

			oscillator.start(context.currentTime)
			oscillator.stop(context.currentTime + 0.2)
		} catch (error) {
			console.log('Sound not available')
		}
	}

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const toggleChat = () => {
		setIsOpen(prev => !prev)
		if (!isOpen) {
			playSound(600)
		}
	}

	const sendMessage = async msg => {
		if (!msg.trim() || isPending) return

		const userMessage = {
			id: Date.now().toString(),
			text: msg,
			isUser: true,
			timestamp: new Date(),
		}

		setMessages(prev => [...prev, userMessage])
		setInput('')
		setShowReactions(false)
		playSound(800)

		// Generate AI response
		startTransition(async () => {
			try {
				const result = await generateAIResponse(msg)

				const aiMessage = {
					id: Date.now().toString() + '_ai',
					text: result.message,
					isUser: false,
					timestamp: new Date(),
				}

				setMessages(prev => [...prev, aiMessage])
				playSound(600)
			} catch (error) {
				const errorMessage = {
					id: Date.now().toString() + '_error',
					text: "Kechirasiz, hozir javob bera olmayman. Keyinroq urinib ko'ring.",
					isUser: false,
					timestamp: new Date(),
				}
				setMessages(prev => [...prev, errorMessage])
			}
		})
	}

	const addReaction = (messageId, reaction) => {
		setMessages(prev =>
			prev.map(msg =>
				msg.id === messageId
					? { ...msg, reactions: [...(msg.reactions || []), reaction] }
					: msg
			)
		)
		playSound(400)
	}

	// Alert animation every 15 seconds when chat is closed
	useEffect(() => {
		let interval
		if (!isOpen) {
			interval = setInterval(() => {
				setAlert(true)
				playSound(400)
				setTimeout(() => setAlert(false), 4000)
			}, 15000)
		}
		return () => clearInterval(interval)
	}, [isOpen, soundEnabled])

	return (
		<>
			<style jsx>{`
				@keyframes pulse-glow {
					0%,
					100% {
						box-shadow: 0 0 20px rgba(14, 50, 127, 0.5);
					}
					50% {
						box-shadow: 0 0 30px rgba(14, 50, 127, 0.8),
							0 0 40px rgba(14, 50, 127, 0.6);
					}
				}
				.pulse-glow {
					animation: pulse-glow 2s infinite;
				}
			`}</style>

			<motion.div
				ref={chatRef}
				drag
				dragConstraints={{ left: -200, top: -200, right: 200, bottom: 200 }}
				className='fixed bottom-4 right-4 z-[100]'
			>
				<AnimatePresence>
					{isOpen ? (
						<motion.div
							initial={{ opacity: 0, y: 50, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 50, scale: 0.9 }}
							transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
							className='w-80 h-[500px] bg-gradient-to-br from-[#0E327F] via-[#1e40af] to-[#3b82f6] text-white rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-lg border border-white/20'
						>
							{/* Header */}
							<div className='flex justify-between items-center p-4 bg-gradient-to-r from-[#0E327F]/90 to-[#1e40af]/90 backdrop-blur-md border-b border-white/10'>
								<div className='flex items-center gap-3'>
									<div className='relative'>
										<Bot className='w-8 h-8 text-yellow-400' />
										<motion.div
											animate={{ scale: [1, 1.2, 1] }}
											transition={{
												duration: 2,
												repeat: Number.POSITIVE_INFINITY,
											}}
											className='absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full'
										/>
									</div>
									<div>
										<h3 className='font-bold text-lg'>AI Yordamchi</h3>
										<p className='text-xs text-blue-200'>
											{isPending ? 'Javob yozmoqda...' : 'Onlayn • Tayyor'}
										</p>
									</div>
								</div>
								<div className='flex items-center gap-2'>
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										onClick={() => setSoundEnabled(!soundEnabled)}
										className='p-2 hover:bg-white/10 rounded-full transition-colors'
									>
										{soundEnabled ? (
											<Volume2 size={18} />
										) : (
											<VolumeX size={18} />
										)}
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										onClick={toggleChat}
										className='p-2 hover:bg-white/10 rounded-full transition-colors'
									>
										<X size={18} />
									</motion.button>
								</div>
							</div>

							{/* Messages */}
							<div className='flex-1 p-4 overflow-y-auto bg-gradient-to-b from-slate-50 to-blue-50 text-gray-800 space-y-3'>
								{messages.length === 0 ? (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										className='text-center py-8'
									>
										<Sparkles className='w-12 h-12 text-blue-500 mx-auto mb-3' />
										<p className='text-gray-500 text-sm'>
											Salom! Men sizga Uzbek tilida yordam beraman.
										</p>
										<p className='text-gray-400 text-xs mt-1'>
											Savolingizni yozing...
										</p>
									</motion.div>
								) : (
									messages.map(msg => (
										<motion.div
											key={msg.id}
											initial={{ opacity: 0, y: 20, scale: 0.9 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											transition={{ duration: 0.3 }}
											className={`flex ${
												msg.isUser ? 'justify-end' : 'justify-start'
											}`}
										>
											<div className='max-w-[80%] group relative'>
												<div
													className={`p-3 rounded-2xl shadow-md ${
														msg.isUser
															? 'bg-gradient-to-r from-[#0E327F] to-[#1e40af] text-white rounded-br-md'
															: 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
													}`}
												>
													<p className='text-sm leading-relaxed'>{msg.text}</p>
													<p
														className={`text-xs mt-1 ${
															msg.isUser ? 'text-blue-200' : 'text-gray-400'
														}`}
													>
														{msg.timestamp.toLocaleTimeString('uz-UZ', {
															hour: '2-digit',
															minute: '2-digit',
														})}
													</p>
												</div>

												{/* Reactions */}
												{msg.reactions && msg.reactions.length > 0 && (
													<div className='flex gap-1 mt-1 flex-wrap'>
														{msg.reactions.map((reaction, idx) => (
															<span
																key={idx}
																className='text-lg bg-white/80 rounded-full px-2 py-1 shadow-sm'
															>
																{reaction}
															</span>
														))}
													</div>
												)}

												{/* Add reaction button */}
												{!msg.isUser && (
													<motion.button
														initial={{ opacity: 0 }}
														whileHover={{ opacity: 1 }}
														className='absolute -bottom-2 right-0 opacity-0 group-hover:opacity-100 bg-gray-200 hover:bg-gray-300 rounded-full p-1 text-xs transition-all'
														onClick={() => addReaction(msg.id, '👍')}
													>
														+
													</motion.button>
												)}
											</div>
										</motion.div>
									))
								)}

								{/* Loading indicator */}
								{isPending && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										className='flex justify-start'
									>
										<div className='bg-white p-3 rounded-2xl rounded-bl-md shadow-md border border-gray-200'>
											<div className='flex gap-1'>
												{[0, 1, 2].map(i => (
													<motion.div
														key={i}
														animate={{ scale: [1, 1.2, 1] }}
														transition={{
															duration: 0.6,
															repeat: Number.POSITIVE_INFINITY,
															delay: i * 0.2,
														}}
														className='w-2 h-2 bg-blue-500 rounded-full'
													/>
												))}
											</div>
										</div>
									</motion.div>
								)}

								<div ref={messagesEndRef} />
							</div>

							{/* Reactions Panel */}
							<AnimatePresence>
								{showReactions && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 20 }}
										className='p-3 bg-white/95 backdrop-blur-md border-t border-gray-200'
									>
										<div className='flex gap-2 mb-2'>
											{Object.keys(reactionCategories).map(category => (
												<button
													key={category}
													onClick={() => setSelectedCategory(category)}
													className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
														selectedCategory === category
															? 'bg-[#0E327F] text-white'
															: 'bg-gray-200 text-gray-600 hover:bg-gray-300'
													}`}
												>
													{category === 'emotions'
														? 'Hissiyot'
														: category === 'gestures'
														? 'Harakat'
														: 'Belgi'}
												</button>
											))}
										</div>
										<div className='flex gap-2 flex-wrap'>
											{reactionCategories[selectedCategory].map(reaction => (
												<motion.button
													key={reaction}
													whileHover={{ scale: 1.2 }}
													whileTap={{ scale: 0.9 }}
													onClick={() => sendMessage(reaction)}
													className='text-2xl hover:bg-gray-100 rounded-lg p-2 transition-colors'
												>
													{reaction}
												</motion.button>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							{/* Quick Replies & Input */}
							<div className='p-3 bg-gradient-to-r from-[#0E327F]/90 to-[#1e40af]/90 backdrop-blur-md border-t border-white/10'>
								<div className='flex flex-wrap gap-2 mb-3'>
									{quickReplies.map((txt, idx) => (
										<motion.button
											key={idx}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => sendMessage(txt)}
											disabled={isPending}
											className='bg-white/20 backdrop-blur-sm text-white text-xs rounded-full px-3 py-1.5 hover:bg-white/30 transition-all border border-white/20 disabled:opacity-50'
										>
											{txt}
										</motion.button>
									))}
								</div>

								{/* Input */}
								<div className='flex gap-2'>
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										onClick={() => setShowReactions(!showReactions)}
										className='bg-white/20 backdrop-blur-sm text-white p-2.5 rounded-full hover:bg-white/30 transition-all border border-white/20'
									>
										😊
									</motion.button>

									<div className='flex-1 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border border-white/20 focus-within:ring-2 focus-within:ring-white/50 transition-all'>
										<input
											type='text'
											value={input}
											onChange={e => setInput(e.target.value)}
											className='w-full p-2.5 text-sm text-white placeholder-white/70 bg-transparent focus:outline-none'
											placeholder='Xabar yozing...'
											onKeyDown={e =>
												e.key === 'Enter' && !isPending && sendMessage(input)
											}
											disabled={isPending}
										/>
									</div>

									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										onClick={() => sendMessage(input)}
										disabled={isPending || !input.trim()}
										className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed'
									>
										<Send size={18} />
									</motion.button>
								</div>
							</div>
						</motion.div>
					) : (
						<motion.button
							initial={{ opacity: 0, scale: 0 }}
							animate={{
								opacity: 1,
								scale: 1,
								y: alert ? [0, -10, 0, -10, 0] : 0,
							}}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => {
								toggleChat()
								setAlert(false)
							}}
							className={`bg-gradient-to-r from-[#0E327F] to-[#1e40af] text-white rounded-full w-16 h-16 shadow-2xl flex flex-col justify-center items-center relative overflow-hidden ${
								alert ? 'pulse-glow' : ''
							}`}
						>
							<motion.div
								animate={
									alert
										? {
												rotate: [0, -10, 10, -10, 0],
												scale: [1, 1.1, 1],
										  }
										: {}
								}
								transition={{
									duration: 0.5,
									repeat: alert ? Number.POSITIVE_INFINITY : 0,
									repeatDelay: 1,
								}}
								className='flex flex-col items-center'
							>
								<MessageCircle size={24} />
								<span className='text-xs font-medium mt-1'>Chat</span>
							</motion.div>

							{alert && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									className='absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap'
								>
									<div className='flex items-center gap-1'>
										<Sparkles size={12} />
										Savolingiz bormi?
									</div>
									<div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600'></div>
								</motion.div>
							)}

							{/* Floating particles */}
							{alert && (
								<div className='absolute inset-0 pointer-events-none'>
									{[...Array(6)].map((_, i) => (
										<motion.div
											key={i}
											initial={{ opacity: 0, scale: 0 }}
											animate={{
												opacity: [0, 1, 0],
												scale: [0, 1, 0],
												x: [0, (Math.random() - 0.5) * 100],
												y: [0, (Math.random() - 0.5) * 100],
											}}
											transition={{
												duration: 2,
												repeat: Number.POSITIVE_INFINITY,
												delay: i * 0.3,
											}}
											className='absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full'
										/>
									))}
								</div>
							)}
						</motion.button>
					)}
				</AnimatePresence>
			</motion.div>
		</>
	)
}
