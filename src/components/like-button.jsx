'use client'

import { cn } from '@/lib/utils'
import { IconThumbUp, IconThumbUpFilled } from '@tabler/icons-react'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export function LikeButton({
	id,
	liked = false,
	count = 0,
	onLike,
	className,
	variant = 'inline',
}) {
	const [pending, setPending] = useState(false)
	const [displayLiked, setDisplayLiked] = useState(liked)
	const [displayCount, setDisplayCount] = useState(count)

	useEffect(() => {
		if (!pending) {
			setDisplayLiked(liked)
			setDisplayCount(count)
		}
	}, [liked, count, pending])

	const handleClick = useCallback(
		async e => {
			e.preventDefault()
			e.stopPropagation()
			if (pending || !id || !onLike) return

			const wasLiked = displayLiked
			setPending(true)
			setDisplayLiked(!wasLiked)
			setDisplayCount(prev => Math.max(0, prev + (wasLiked ? -1 : 1)))

			try {
				await onLike(id)
			} catch {
				setDisplayLiked(wasLiked)
				setDisplayCount(count)
			} finally {
				setPending(false)
			}
		},
		[pending, id, onLike, displayLiked, count],
	)

	const iconClass = variant === 'pill' ? 'h-5 w-5' : 'h-4 w-4'

	return (
		<button
			type='button'
			onClick={handleClick}
			disabled={pending}
			aria-busy={pending}
			aria-label={displayLiked ? 'Laykni olib tashlash' : 'Layk qo‘yish'}
			className={cn(
				'inline-flex items-center gap-1 text-sm transition-colors',
				variant === 'pill'
					? 'cursor-pointer rounded-full bg-blue-100 px-3 py-1.5 text-blue-900 hover:bg-blue-200/80 disabled:cursor-wait'
					: 'cursor-pointer text-muted-foreground hover:text-blue-800 disabled:cursor-wait',
				className,
			)}
		>
			<span
				className={cn(
					'relative inline-flex shrink-0 items-center justify-center',
					iconClass,
				)}
			>
				{pending ? (
					<Loader2
						className={cn('animate-spin text-blue-700', iconClass)}
						aria-hidden
					/>
				) : displayLiked ? (
					<IconThumbUpFilled stroke={2} className={iconClass} />
				) : (
					<IconThumbUp stroke={2} className={iconClass} />
				)}
			</span>
			<span className='tabular-nums leading-none'>{displayCount}</span>
		</button>
	)
}
