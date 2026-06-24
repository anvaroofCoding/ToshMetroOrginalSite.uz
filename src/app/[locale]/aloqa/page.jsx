import { ContactPageJsonLd } from '@/components/seo/json-ld'
import ContactInfo from './contact'

export default async function Page({ params }) {
	const { locale } = await params

	return (
		<>
			<ContactPageJsonLd locale={locale} />
			<ContactInfo />
		</>
	)
}
