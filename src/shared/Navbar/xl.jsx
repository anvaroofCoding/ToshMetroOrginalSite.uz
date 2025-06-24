'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
import MetroNavbar from './ul'

const Xl = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => setIsOpen(!isOpen)
	const closeMenu = () => setIsOpen(false)
	return (
		<div className='hidden xl:block 2xl:hidden'>
			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							key='overlay'
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className='fixed inset-0 bg-black z-[99]'
							onClick={closeMenu}
						/>

						<motion.div
							key='modal'
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className='fixed top-0 right-0 w-64 h-full bg-[#0E327F] text-white shadow-lg z-[100] p-4 flex flex-col gap-4'
						>
							<div className='flex justify-between items-center border-b border-white pb-2'>
								<h2 className='text-lg font-bold'>Menyu</h2>
								<button onClick={closeMenu}>
									<X />
								</button>
							</div>

							<MetroNavbar />
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Xl
