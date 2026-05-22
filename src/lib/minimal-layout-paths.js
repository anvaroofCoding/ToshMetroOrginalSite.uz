/** Navbar / footer ko'rinmaydigan sahifalar (locale prefiksisiz pathname) */
export const MINIMAL_LAYOUT_PATHS = ['/kirish', '/royxatdan-otish']

export function isMinimalLayoutPath(pathname) {
	if (!pathname) return false

	return MINIMAL_LAYOUT_PATHS.some(
		segment => pathname === segment || pathname.startsWith(`${segment}/`),
	)
}
