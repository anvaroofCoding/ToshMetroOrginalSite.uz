import { ItemListJsonLd } from '@/components/seo/json-ld'
import { fetchNewsList, fetchAllNewsItems } from '@/lib/seo/server-api'
import { getPageSeoConfig } from '@/lib/seo/build-metadata'
import NewsMain from './new'

export default async function Page({ params }) {
	const { locale } = await params
	const [initialData, allItems] = await Promise.all([
		fetchNewsList(locale, { page: 1, pageSize: 12 }),
		fetchAllNewsItems(locale),
	])
	const seo = getPageSeoConfig('yangiliklar', locale)

	return (
		<>
			<ItemListJsonLd
				items={allItems}
				locale={locale}
				segment='yangiliklar'
				listName={seo?.title ?? 'Yangiliklar'}
			/>
			<NewsMain initialData={initialData} />
		</>
	)
}
