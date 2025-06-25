'use client'

import Loading from '@/app/loading'
import { useEffect, useState } from 'react'

export default function Layout({ children }) {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const timeout = setTimeout(() => setLoading(false), 1000)
		return () => clearTimeout(timeout)
	}, [])

	if (loading) return <Loading />

	return <>{children}</>
}
