'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RouteLoader() {
	const pathname = usePathname()
	const [progress, setProgress] = useState(0)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		setProgress(0)
		setVisible(true)

		const interval = setInterval(() => {
			setProgress(prev => {
				if (prev >= 90) {
					clearInterval(interval)
					return prev
				}
				return prev + 10
			})
		}, 100)

		const complete = setTimeout(() => {
			setProgress(100)
			setTimeout(() => {
				setVisible(false)
			}, 300)
		}, 800)

		return () => {
			clearInterval(interval)
			clearTimeout(complete)
		}
	}, [pathname])

	if (!visible) return null

	return (
		<div className='fixed top-0 left-0 w-full h-1 z-[9999] bg-transparent'>
			<div
				className='h-full bg-blue-600 transition-all duration-200'
				style={{ width: `${progress}%` }}
			></div>
		</div>
	)
}
