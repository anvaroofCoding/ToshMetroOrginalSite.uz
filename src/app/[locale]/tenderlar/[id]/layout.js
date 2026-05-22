import { metadataFromSegment } from '@/lib/seo/build-metadata'
import { buildTenderMetadata } from '@/lib/seo/dynamic-metadata'

export async function generateMetadata({ params }) {
	const { locale, id } = await params
	const dynamic = await buildTenderMetadata(locale, id)
	if (dynamic) return dynamic
	return metadataFromSegment('tenderlar', locale)
}

export default function Layout({ children }) {
	return children
}
