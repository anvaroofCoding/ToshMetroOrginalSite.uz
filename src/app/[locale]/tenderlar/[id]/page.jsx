import { NewsArticleJsonLd } from '@/components/seo/json-ld'
import { fetchTenderDetail } from '@/lib/seo/server-api'
import TenderDetails from './tender-details'

export default async function Page({ params }) {
	const { locale, id } = await params
	const initialData = await fetchTenderDetail(locale, id)

	return (
		<>
			{initialData && (
				<NewsArticleJsonLd
					data={initialData}
					locale={locale}
					segment='tenderlar'
				/>
			)}
			<TenderDetails initialData={initialData} />
		</>
	)
}
