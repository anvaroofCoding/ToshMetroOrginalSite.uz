// components/SplashScreen.jsx
'use client'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const SplashScreen = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 2000) // 2s splash davomiyligi

		return () => clearTimeout(timer)
	}, [])

	return (
		<>
			<AnimatePresence>
				{isLoading && (
					<motion.div
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.8 }}
						className='fixed inset-0 z-[9999] bg-white dark:bg-gray-900 flex items-center justify-center'
					>
						<motion.h1
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 1 }}
							className='text-4xl font-bold text-blue-600 dark:text-white'
						>
							<DotLottieReact
								className='w-[100vw] m-0 p-0 bg-[#000028] h-[100vh]'
								src='https://lottie.host/5eecb277-5ad0-4af4-b655-5ac4d571d8e9/BnIX82njBa.lottie'
								loop
								autoplay
							/>
						</motion.h1>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Haqiqiy sayt */}
			<div className={isLoading ? 'invisible' : 'visible'}>{children}</div>
		</>
	)
}

export default SplashScreen
