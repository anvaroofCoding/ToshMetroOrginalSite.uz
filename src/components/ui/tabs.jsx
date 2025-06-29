'use client'

import { cn } from '@/lib/utils'
import { createContext, useContext, useState } from 'react'

const TabsContext = createContext()

function Tabs({
	defaultValue,
	value,
	onValueChange,
	children,
	className,
	...props
}) {
	const [internalValue, setInternalValue] = useState(defaultValue)
	const currentValue = value !== undefined ? value : internalValue

	const handleValueChange = newValue => {
		if (value === undefined) {
			setInternalValue(newValue)
		}
		if (onValueChange) {
			onValueChange(newValue)
		}
	}

	return (
		<div className={cn('w-full', className)} {...props}>
			<TabsContext.Provider
				value={{ value: currentValue, onValueChange: handleValueChange }}
			>
				{children}
			</TabsContext.Provider>
		</div>
	)
}

function TabsList({ className, children, ...props }) {
	return (
		<div
			className={cn(
				'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}

function TabsTrigger({ value, className, children, ...props }) {
	const ctx = useContext(TabsContext)

	const isActive = ctx.value === value

	return (
		<button
			className={cn(
				'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium',
				isActive ? 'bg-background text-foreground shadow-sm' : '',
				className
			)}
			onClick={() => ctx.onValueChange(value)}
			{...props}
		>
			{children}
		</button>
	)
}

function TabsContent({ value, className, children, ...props }) {
	const ctx = useContext(TabsContext)
	const isActive = ctx.value === value

	if (!isActive) return null

	return (
		<div
			className={cn(
				'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
