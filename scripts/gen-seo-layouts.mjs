import fs from 'fs'
import path from 'path'

const pairs = [
	['metro-xaritasi', 'metroXaritasiSeo'],
	['metro-rejasi', 'metroRejasiSeo'],
	['tolov-usullari', 'tolovUsullariSeo'],
	['atto-kartalar', 'attoKartalarSeo'],
	['atto-ilova', 'attoIlovaSeo'],
	['palmpay', 'palmpaySeo'],
	['foydalanish-qoidalari', 'foydalanishQoidalariSeo'],
	['davlat-ramzlari', 'davlatRamzlariSeo'],
	['murojaatlar', 'murojaatlarSeo'],
	['statistika', 'statistikaSeo'],
	['yangiliklar', 'yangiliklarSeo'],
	['korrupsiya', 'korrupsiyaSeo'],
	['tenderlar', 'tenderlarSeo'],
	['mediateka', 'mediatekaSeo'],
	['metropoliten-tarixi', 'metropolitenTarixiSeo'],
	['rahbariyat', 'rahbariyatSeo'],
	['tashkiliy-tuzilma', 'tashkiliyTuzilmaSeo'],
	['vakansiyalar', 'vakansiyalarSeo'],
	['haqimizda', 'haqimizdaSeo'],
	['gender-tenglik', 'genderTenglikSeo'],
	['normativ-hujjatlar', 'normativHujjatlarSeo'],
	['ai-yordamchi', 'aiYordamchiSeo'],
	['aloqa', 'aloqaSeo'],
	['kirish', 'kirishSeo'],
	['royxatdan-otish', 'royxatdanOishSeo'],
]

const tpl = exp => `import { ${exp} } from '@/lib/seo/layout'

export const generateMetadata = ${exp}.generateMetadata
export default ${exp}.default
`

const root = 'src/app/[locale]'

for (const [dir, exp] of pairs) {
	const file = path.join(root, dir, 'layout.js')
	fs.mkdirSync(path.dirname(file), { recursive: true })
	fs.writeFileSync(file, tpl(exp))
}

fs.mkdirSync(path.join(root, 'facepay'), { recursive: true })
fs.writeFileSync(path.join(root, 'facepay', 'layout.js'), tpl('facepaySeo'))

console.log('SEO layouts:', pairs.length + 1)
