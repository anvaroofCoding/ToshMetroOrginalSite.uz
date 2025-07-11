'use client'

import { useEffect, useState } from 'react'
import Loading from '../components/management/loading'

export default function Layout({ children }) {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const timeout = setTimeout(() => setLoading(false), 1000)
		return () => clearTimeout(timeout)
	}, [])

	if (loading) return <Loading />

	return <>{children}</>
}
