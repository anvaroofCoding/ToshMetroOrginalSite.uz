'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
	formatCommentDate,
	getCommentAuthor,
	getCommentDateValue,
} from '@/lib/format-comment-date'
import { cn } from '@/lib/utils'
import { Loader2, MessageCircle, Send } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

function AuthorAvatar({ name }) {
	const initial = (name?.trim()?.[0] || '?').toUpperCase()

	return (
		<div
			className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-800'
			aria-hidden
		>
			{initial}
		</div>
	)
}

export function CommentsPanel({
	id,
	useCommentsQuery,
	usePostComment,
	buildPostBody,
	className,
}) {
	const t = useTranslations('menu')
	const locale = useLocale()
	const { data, isLoading, error, refetch } = useCommentsQuery(id)
	const [postComment, { isLoading: posting }] = usePostComment()
	const [inputValue, setInputValue] = useState('')
	const listRef = useRef(null)

	const comments = Array.isArray(data)
		? data
		: Array.isArray(data?.results)
			? data.results
			: []

	useEffect(() => {
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight
		}
	}, [comments.length, posting])

	const handleSubmit = async e => {
		e.preventDefault()
		const text = inputValue.trim()
		if (!text) {
			toast.error(t('comment_required'))
			return
		}

		try {
			await postComment(buildPostBody(text)).unwrap()
			setInputValue('')
			toast.success(t('commentSent'))
			refetch?.()
		} catch {
			toast.error(t('commentError'))
		}
	}

	return (
		<section
			className={cn(
				'mt-10 overflow-hidden rounded-2xl border border-blue-200/80 bg-white shadow-sm',
				className,
			)}
		>
			<div className='flex items-center gap-2 border-b border-blue-100 bg-blue-50/80 px-4 py-3 sm:px-5'>
				<MessageCircle className='h-5 w-5 text-blue-800' />
				<h2 className='text-lg font-semibold text-blue-900'>
					{t('two_hundred_forty_four')}
				</h2>
				{comments.length > 0 ? (
					<span className='ml-auto rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800'>
						{comments.length}
					</span>
				) : null}
			</div>

			<div
				ref={listRef}
				className='max-h-[420px] min-h-[160px] space-y-4 overflow-y-auto px-4 py-4 sm:px-5'
			>
				{isLoading ? (
					<div className='flex min-h-[120px] items-center justify-center gap-2 text-sm text-muted-foreground'>
						<Loader2 className='h-5 w-5 animate-spin text-blue-700' />
						{t('two_hundred_forty_nine')}
					</div>
				) : null}

				{error ? (
					<p className='py-6 text-center text-sm text-red-600'>
						{t('two_hundred_forty')}
					</p>
				) : null}

				{!isLoading && !error && comments.length === 0 ? (
					<p className='py-8 text-center text-sm text-muted-foreground'>
						{t('two_hundred_forty_eight')}
					</p>
				) : null}

				{comments.map(comment => {
					const author = getCommentAuthor(comment) || t('commentGuest')
					const dateLabel = formatCommentDate(
						getCommentDateValue(comment),
						locale,
					)

					return (
						<article
							key={comment.id}
							className='flex gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3'
						>
							<AuthorAvatar name={author} />
							<div className='min-w-0 flex-1'>
								<div className='mb-1 flex flex-wrap items-center gap-x-2 gap-y-0.5'>
									<span className='text-sm font-semibold text-slate-900'>
										{author}
									</span>
									{dateLabel ? (
										<time
											className='text-xs text-slate-500'
											dateTime={getCommentDateValue(comment) ?? undefined}
										>
											{dateLabel}
										</time>
									) : null}
								</div>
								<p className='whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700'>
									{comment.content}
								</p>
							</div>
						</article>
					)
				})}
			</div>

			<form
				onSubmit={handleSubmit}
				className='border-t border-blue-100 bg-white p-4 sm:p-5'
			>
				<Textarea
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					placeholder={t('two_hundred_forty_six')}
					disabled={posting}
					rows={3}
					maxLength={2000}
					className='min-h-[88px] resize-y border-blue-200 bg-white text-base focus-visible:border-blue-400 focus-visible:ring-blue-200/60'
				/>
				<div className='mt-3 flex items-center justify-end gap-2'>
					<Button
						type='submit'
						disabled={posting || !inputValue.trim()}
						className='h-10 gap-2 bg-blue-800 px-5 text-white hover:bg-blue-700 disabled:opacity-50'
					>
						{posting ? (
							<Loader2 className='h-4 w-4 animate-spin' />
						) : (
							<Send className='h-4 w-4' />
						)}
						{t('two_hundred_forty_seven')}
					</Button>
				</div>
			</form>
		</section>
	)
}
