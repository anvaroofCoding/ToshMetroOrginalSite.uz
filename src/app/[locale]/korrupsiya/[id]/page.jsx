import { NewsArticleJsonLd } from '@/components/seo/json-ld'
import { fetchKorrupsiyaDetail } from '@/lib/seo/server-api'
import CorubsiyaDetail from './corubsiya_detail'

export default async function Page({ params }) {
	const { locale, id } = await params
	const initialData = await fetchKorrupsiyaDetail(locale, id)

	return (
		<>
			{initialData && (
				<NewsArticleJsonLd
					data={initialData}
					locale={locale}
					segment='korrupsiya'
				/>
			)}
			<CorubsiyaDetail initialData={initialData} />
		</>
	)
}
