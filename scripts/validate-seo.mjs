/**
 * Navbar sahifalari SEO validatsiyasi.
 * Ishga tushirish: node scripts/validate-seo.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const { NAV_PATHS } = await import('../src/lib/seo/nav-routes.js')
const { PAGE_SEO } = await import('../src/lib/seo/pages.js')
const { SITE } = await import('../src/lib/seo/site.js')

const LOCALES = SITE.locales
const layoutRoot = path.join(root, 'src/app/[locale]')

let errors = 0
let warnings = 0

function fail(msg) {
	console.error(`  ✗ ${msg}`)
	errors++
}

function warn(msg) {
	console.warn(`  ⚠ ${msg}`)
	warnings++
}

function ok(msg) {
	console.log(`  ✓ ${msg}`)
}

console.log('\n=== SEO validatsiya: navbar sahifalari ===\n')

for (const segment of NAV_PATHS) {
	const seo = PAGE_SEO[segment]
	if (!seo) {
		fail(`"${segment}" — PAGE_SEO da yo‘q`)
		continue
	}

	for (const locale of LOCALES) {
		const config = seo[locale] ?? seo.uz
		if (!config?.title?.trim()) {
			fail(`"${segment}" [${locale}] — title yo‘q`)
		}
		if (!config?.description?.trim()) {
			fail(`"${segment}" [${locale}] — description yo‘q`)
		}
		if (config?.title && config.title.length > 70) {
			warn(`"${segment}" [${locale}] — title ${config.title.length} belgi (70 dan oshdi)`)
		}
	}

	const layoutPath = path.join(layoutRoot, segment, 'layout.js')
	if (!fs.existsSync(layoutPath)) {
		fail(`"${segment}" — layout.js yo‘q (${layoutPath})`)
	} else {
		ok(`"${segment}" — SEO + layout mavjud`)
	}
}

// Takrorlanuvchi titlelar (bir til ichida)
for (const locale of LOCALES) {
	const titles = new Map()
	for (const [segment, seo] of Object.entries(PAGE_SEO)) {
		const config = seo[locale] ?? seo.uz
		if (!config?.title || config.noIndex) continue
		const key = config.title.trim()
		if (titles.has(key)) {
			fail(
				`Takroriy title [${locale}]: "${key}" — "${titles.get(key)}" va "${segment}"`,
			)
		} else {
			titles.set(key, segment)
		}
	}
}

console.log(`\n=== Natija: ${errors} xato, ${warnings} ogohlantirish ===\n`)
process.exit(errors > 0 ? 1 : 0)
