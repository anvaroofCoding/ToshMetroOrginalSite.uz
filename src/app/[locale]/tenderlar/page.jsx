import { ContentDirectory } from '@/components/seo/content-directory'
import { ItemListJsonLd } from '@/components/seo/json-ld'
import { fetchTendersList, fetchAllTenderItems } from '@/lib/seo/server-api'
import { getPageSeoConfig } from '@/lib/seo/build-metadata'
import { Tender } from './tender'

export default async function Page({ params }) {
	const { locale } = await params
	const [initialData, allItems] = await Promise.all([
		fetchTendersList(locale, { page: 1, pageSize: 12 }),
		fetchAllTenderItems(locale),
	])
	const seo = getPageSeoConfig('tenderlar', locale)

	return (
		<div>
			<ItemListJsonLd
				items={allItems}
				locale={locale}
				segment='tenderlar'
				listName={seo?.title ?? 'Tenderlar'}
			/>
			<Tender initialData={initialData} />
			<ContentDirectory
				items={allItems}
				locale={locale}
				segment='tenderlar'
				heading='Barcha tenderlar'
			/>
		</div>
	)
}
