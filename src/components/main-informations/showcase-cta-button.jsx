import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

const baseClassName =
	'inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-blue-900 font-semibold text-sm sm:text-base shadow-md hover:bg-blue-50 hover:shadow-lg transition-all duration-200'

export function ShowcaseCtaButton({ href, children, className, onClick }) {
	if (onClick) {
		return (
			<button type='button' onClick={onClick} className={cn(baseClassName, className)}>
				<span>{children}</span>
				<ArrowRight className='h-4 w-4 shrink-0' aria-hidden />
			</button>
		)
	}

	return (
		<Link href={href} className={cn(baseClassName, className)}>
			<span>{children}</span>
			<ArrowRight className='h-4 w-4 shrink-0' aria-hidden />
		</Link>
	)
}
