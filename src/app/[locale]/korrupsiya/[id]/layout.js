import { metadataFromSegment } from '@/lib/seo/build-metadata'
import { buildKorrupsiyaMetadata } from '@/lib/seo/dynamic-metadata'

export async function generateMetadata({ params }) {
	const { locale, id } = await params
	const dynamic = await buildKorrupsiyaMetadata(locale, id)
	if (dynamic) return dynamic
	return metadataFromSegment('korrupsiya', locale)
}

export default function Layout({ children }) {
	return children
}
