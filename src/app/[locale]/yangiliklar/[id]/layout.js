import { metadataFromSegment } from '@/lib/seo/build-metadata'
import { buildNewsArticleMetadata } from '@/lib/seo/dynamic-metadata'

export async function generateMetadata({ params }) {
	const { locale, id } = await params
	const dynamic = await buildNewsArticleMetadata(locale, id)
	if (dynamic) return dynamic
	return metadataFromSegment('yangiliklar', locale)
}

export default function Layout({ children }) {
	return children
}
