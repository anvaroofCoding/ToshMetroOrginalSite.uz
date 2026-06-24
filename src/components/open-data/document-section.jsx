'use client'

import { Download, FileText } from 'lucide-react'
import Link from 'next/link'

export function OpenDataPageShell({ title, subtitle, children }) {
	return (
		<div className='min-h-screen py-8 sm:py-12 lg:py-16'>
			<div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
				<div className='mb-10 text-center sm:mb-14'>
					<h1 className='mb-3 text-2xl font-bold text-blue-900 sm:text-3xl lg:text-4xl xl:text-5xl'>
						{title}
					</h1>
					<div className='mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 sm:w-20 lg:w-24' />
					<p className='mx-auto mt-4 max-w-3xl text-sm text-blue-700 sm:text-base lg:text-lg'>
						{subtitle}
					</p>
				</div>
				{children}
			</div>
		</div>
	)
}

export function DocumentSection({ title, description, items, downloadLabel, soonLabel }) {
	return (
		<section className='mb-10 sm:mb-12'>
			<div className='mb-5 sm:mb-6'>
				<h2 className='text-xl font-bold text-blue-900 sm:text-2xl'>{title}</h2>
				{description ? (
					<p className='mt-2 max-w-3xl text-sm text-gray-600 sm:text-base'>
						{description}
					</p>
				) : null}
			</div>

			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{items.map(item => (
					<article
						key={`${item.year}-${item.title}`}
						className='flex flex-col rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition-shadow hover:border-blue-200 hover:shadow-md'
					>
						<div className='mb-4 flex items-start justify-between gap-3'>
							<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700'>
								<FileText className='h-5 w-5' />
							</div>
							<span className='rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800'>
								{item.year}
							</span>
						</div>

						<h3 className='mb-4 flex-1 text-base font-semibold leading-snug text-gray-800 sm:text-lg'>
							{item.title}
						</h3>

						{item.file ? (
							<Link
								href={item.file}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-medium text-white transition hover:from-blue-700 hover:to-blue-800'
							>
								<Download className='h-4 w-4' />
								{downloadLabel}
							</Link>
						) : (
							<span className='inline-flex items-center justify-center rounded-lg border border-dashed border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700'>
								{soonLabel}
							</span>
						)}
					</article>
				))}
			</div>
		</section>
	)
}
