'use client'

import { motion } from 'framer-motion'
import { Send, X } from 'lucide-react'
import { useState } from 'react'

const quickReplies = [
	'Salom!',
	'Qanday yordam bera olaman?',
	'Rahmat!',
	'Xayr!',
]

export default function FloatingChat() {
	const [isOpen, setIsOpen] = useState(false)
	const [messages, setMessages] = useState([])
	const [input, setInput] = useState('')

	const toggleChat = () => setIsOpen(prev => !prev)

	const sendMessage = msg => {
		if (!msg.trim()) return
		setMessages(prev => [...prev, msg])
		setInput('')
	}

	return (
		<motion.div
			drag
			dragConstraints={{ left: 0, top: 0, right: 1000, bottom: 1000 }}
			className='fixed bottom-4 right-4 z-[100]'
		>
			{isOpen ? (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					transition={{ duration: 0.3 }}
					className='w-72 h-96 bg-[#0E327F] text-white rounded-xl shadow-xl flex flex-col overflow-hidden'
				>
					{/* Header */}
					<div className='flex justify-between items-center p-3 bg-[#0E327F]'>
						<span className='font-bold'>Chat</span>
						<button onClick={toggleChat}>
							<X />
						</button>
					</div>

					{/* Messages */}
					<div className='flex-1 p-2 overflow-y-auto bg-white text-black'>
						{messages.length === 0 ? (
							<p className='text-sm text-gray-500'>Hali xabar yo'q...</p>
						) : (
							messages.map((msg, idx) => (
								<div
									key={idx}
									className='mb-1 bg-blue-100 p-2 rounded-lg max-w-[80%]'
								>
									{msg}
								</div>
							))
						)}
					</div>

					{/* Quick replies */}
					<div className='flex flex-wrap gap-1 p-2 bg-[#0E327F]'>
						{quickReplies.map((txt, idx) => (
							<button
								key={idx}
								onClick={() => sendMessage(txt)}
								className='bg-white text-[#0E327F] text-xs rounded-full px-3 py-1 hover:bg-blue-100 transition'
							>
								{txt}
							</button>
						))}
					</div>

					{/* Input */}
					<div className='p-2 bg-[#0E327F]'>
						<div className='flex bg-white rounded-full overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-blue-300 transition'>
							<input
								type='text'
								value={input}
								onChange={e => setInput(e.target.value)}
								className='flex-1 p-2 text-sm text-black focus:outline-none'
								placeholder='Xabar yozing...'
								onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
							/>
							<motion.button
								whileTap={{ scale: 1.2 }}
								onClick={() => sendMessage(input)}
								className='bg-[#0E327F] text-white p-2 flex items-center justify-center'
							>
								<Send size={18} />
							</motion.button>
						</div>
					</div>
				</motion.div>
			) : (
				<motion.button
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					whileHover={{ scale: 1.1 }}
					onClick={toggleChat}
					className='bg-[#0E327F] text-white rounded-full w-12 h-12 shadow-lg flex justify-center items-center'
				>
					Chat
				</motion.button>
			)}
		</motion.div>
	)
}
