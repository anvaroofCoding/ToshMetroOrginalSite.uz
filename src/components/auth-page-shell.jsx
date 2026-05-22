'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function AuthPageShell({ children, className, contentClassName }) {
	const t = useTranslations('menu')

	return (
		<div
			className={cn(
				'relative flex min-h-svh w-full flex-col items-center justify-center bg-transparent p-6 pt-20 md:p-10',
				className,
			)}
		>
			<div className='absolute top-4 left-4 z-20'>
				<Button
					asChild
					size='lg'
					className='h-auto rounded-full bg-blue-900 px-4 py-2 text-white shadow-lg hover:bg-blue-800 sm:px-6 sm:py-3'
				>
					<Link href='/' className='flex items-center gap-2'>
						<ArrowLeft className='h-4 w-4 sm:h-5 sm:w-5' />
						<span className='hidden sm:inline'>{t('backHomeShort')}</span>
					</Link>
				</Button>
			</div>

			<div className={cn('w-full max-w-sm', contentClassName)}>{children}</div>
		</div>
	)
}
