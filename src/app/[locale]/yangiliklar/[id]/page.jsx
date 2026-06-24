import { NewsArticleJsonLd } from '@/components/seo/json-ld'
import { fetchNewsDetail } from '@/lib/seo/server-api'
import NewsArticlePage from './news-article-page'

export default async function Page({ params }) {
	const { locale, id } = await params
	const initialData = await fetchNewsDetail(locale, id)

	return (
		<>
			{initialData && (
				<NewsArticleJsonLd
					data={initialData}
					locale={locale}
					segment='yangiliklar'
				/>
			)}
			<NewsArticlePage initialData={initialData} />
		</>
	)
}
