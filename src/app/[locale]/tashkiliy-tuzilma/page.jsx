import { DepartmentsListJsonLd } from '@/components/seo/json-ld'
import { getPageSeoConfig } from '@/lib/seo/build-metadata'
import { fetchDepartments } from '@/lib/seo/server-api'
import TransportDirectory from './tarkib'

export default async function Page({ params }) {
	const { locale } = await params
	const initialDepartments = await fetchDepartments(locale)
	const seo = getPageSeoConfig('tashkiliy-tuzilma', locale)

	return (
		<>
			<DepartmentsListJsonLd
				departments={initialDepartments}
				locale={locale}
				listName={seo?.title ?? 'Tashkiliy tuzilma'}
			/>
			<TransportDirectory initialDepartments={initialDepartments} />
		</>
	)
}
