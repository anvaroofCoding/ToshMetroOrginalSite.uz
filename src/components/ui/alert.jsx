import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { CheckCircle2, Info, XCircle } from 'lucide-react'

const alertVariants = cva(
	'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
	{
		variants: {
			variant: {
				default: 'bg-background text-foreground border',
				destructive:
					'bg-red-50 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-100',
				success:
					'bg-green-50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-100',
				info: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-900/20 dark:text-blue-100',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
)

const icons = {
	default: Info,
	destructive: XCircle,
	success: CheckCircle2,
	info: Info,
}

const Alert = ({ className, variant = 'default', children, ...props }, ref) => {
	const Icon = icons[variant]
	return (
		<div
			ref={ref}
			role='alert'
			className={cn(alertVariants({ variant }), className)}
			{...props}
		>
			<Icon className='h-5 w-5' />
			<div className='pl-8 text-sm'>{children}</div>
		</div>
	)
}
Alert.displayName = 'Alert'

const AlertDescription = ({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn('text-sm leading-relaxed text-muted-foreground', className)}
		{...props}
	/>
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription }
