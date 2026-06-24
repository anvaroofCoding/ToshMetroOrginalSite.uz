import { stripHtml } from '@/lib/seo/text-utils'

export function MediaSeoDirectory({ photos = [], videos = [], heading }) {
	if (!photos.length && !videos.length) return null

	return (
		<section
			className='container mx-auto border-t border-blue-100 py-10'
			aria-label={heading}
		>
			<h2 className='mb-6 text-xl font-semibold text-blue-900'>{heading}</h2>

			{photos.length > 0 && (
				<div className='mb-8'>
					<h3 className='mb-4 text-lg font-medium text-blue-800'>Fotosuratlar</h3>
					<ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						{photos.map(photo => (
							<li key={`photo-${photo.id}`}>
								<article className='rounded-lg border border-blue-100 p-4'>
									<h4 className='font-semibold'>{photo.title}</h4>
									{photo.category && (
										<p className='mt-1 text-sm text-slate-600'>
											{stripHtml(photo.category)}
										</p>
									)}
								</article>
							</li>
						))}
					</ul>
				</div>
			)}

			{videos.length > 0 && (
				<div>
					<h3 className='mb-4 text-lg font-medium text-blue-800'>Videolar</h3>
					<ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						{videos.map(video => (
							<li key={`video-${video.id}`}>
								<article className='rounded-lg border border-blue-100 p-4'>
									<h4 className='font-semibold'>{video.title}</h4>
									{video.category && (
										<p className='mt-1 text-sm text-slate-600'>
											{stripHtml(video.category)}
										</p>
									)}
								</article>
							</li>
						))}
					</ul>
				</div>
			)}
		</section>
	)
}
