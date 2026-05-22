import { metadataFromSegment } from './build-metadata'

export function createSegmentMetadata(segment) {
	return async function generateMetadata({ params }) {
		const { locale } = await params
		return metadataFromSegment(segment, locale)
	}
}

export function createSeoLayout(segment) {
	return {
		generateMetadata: createSegmentMetadata(segment),
		default: function SeoLayout({ children }) {
			return children
		},
	}
}
