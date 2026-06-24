import { PageLoadingOverlay } from '@/components/page-loading'

/** GlobalPageLoading (SiteChrome) bitta overlay ko‘rsatadi — bu faqat store ga signal */
export default function Loading() {
	return <PageLoadingOverlay />
}
