import Link from 'next/link'
import { stripHtml } from '@/lib/seo/text-utils'

export function ContentDirectory({ items = [], locale, segment, heading }) {
	if (!items.length) return null

	return (
		<section
			className='container mx-auto border-t border-blue-100 py-10'
			aria-label={heading}
		>
			<h2 className='mb-6 text-xl font-semibold text-blue-900'>{heading}</h2>
			<ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{items.map(item => (
					<li key={item.id}>
						<article className='rounded-lg border border-blue-100 p-4'>
							<h3 className='text-base font-semibold'>
								<Link href={`/${locale}/${segment}/${item.id}`}>
									{item.title}
								</Link>
							</h3>
							{(item.description || item.fullContent) && (
								<p className='mt-2 text-sm text-slate-600'>
									{stripHtml(item.description || item.fullContent || '')}
								</p>
							)}
						</article>
					</li>
				))}
			</ul>
		</section>
	)
}
