import { ManagementListJsonLd } from '@/components/seo/json-ld'
import { getPageSeoConfig } from '@/lib/seo/build-metadata'
import { fetchManagement } from '@/lib/seo/server-api'
import ManagementPage from './raxbariyat'

export default async function Page({ params }) {
	const { locale } = await params
	const initialManagement = await fetchManagement(locale)
	const seo = getPageSeoConfig('rahbariyat', locale)

	return (
		<>
			<ManagementListJsonLd
				members={initialManagement}
				locale={locale}
				listName={seo?.title ?? 'Toshkent metropoliteni AJ ning rahbariyati'}
			/>
			<ManagementPage initialManagement={initialManagement} />
		</>
	)
}
