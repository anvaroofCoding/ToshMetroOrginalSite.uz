import { MediaGalleryJsonLd } from '@/components/seo/json-ld'
import { fetchMediaPhotos, fetchMediaVideos } from '@/lib/seo/server-api'
import Mediatekas from './mediateka'

export default async function Page({ params }) {
	const { locale } = await params
	const [initialPhotos, initialVideos] = await Promise.all([
		fetchMediaPhotos(locale),
		fetchMediaVideos(locale),
	])

	return (
		<div className='py-10'>
			<MediaGalleryJsonLd
				photos={initialPhotos}
				videos={initialVideos}
				locale={locale}
			/>
			<Mediatekas
				initialPhotos={initialPhotos}
				initialVideos={initialVideos}
			/>
		</div>
	)
}
