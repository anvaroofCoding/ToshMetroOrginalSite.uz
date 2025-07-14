'use client'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const SplashScreen = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 3000) // Splash 2 soniya davom etadi

		return () => clearTimeout(timer)
	}, [])

	if (isLoading) {
		return (
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.8 }}
					className='fixed inset-0 z-[9999] bg-white dark:bg-gray-900 flex items-center justify-center'
				>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 1 }}
					>
						<DotLottieReact
							className='w-[100vw] m-0 p-0 bg-[#000028] h-[100vh]'
							src='https://lottie.host/5eecb277-5ad0-4af4-b655-5ac4d571d8e9/BnIX82njBa.lottie'
							loop
							autoplay
						/>
					</motion.div>
				</motion.div>
			</AnimatePresence>
		)
	}

	// Faqat loading tugaganidan keyin children ko‘rsatiladi
	return <>{children}</>
}

export default SplashScreen
