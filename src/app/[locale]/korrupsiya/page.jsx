import { ItemListJsonLd } from '@/components/seo/json-ld'
import { fetchKorrupsiyaList, fetchAllKorrupsiyaItems } from '@/lib/seo/server-api'
import { getPageSeoConfig } from '@/lib/seo/build-metadata'
import { Corubsiya } from './korubsiya'

export default async function Page({ params }) {
	const { locale } = await params
	const [initialData, allItems] = await Promise.all([
		fetchKorrupsiyaList(locale, { page: 1, pageSize: 12 }),
		fetchAllKorrupsiyaItems(locale),
	])
	const seo = getPageSeoConfig('korrupsiya', locale)

	return (
		<div>
			<ItemListJsonLd
				items={allItems}
				locale={locale}
				segment='korrupsiya'
				listName={seo?.title ?? 'Korrupsiya'}
			/>
			<Corubsiya initialData={initialData} />
		</div>
	)
}
