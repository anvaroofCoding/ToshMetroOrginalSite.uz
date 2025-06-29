import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Calendar, DollarSign, Ticket } from 'lucide-react'

export function AttoKart({ title, description, fiyat, gecerlilik }) {
	return (
		<Card className='h-full flex flex-col transform hover:-translate-y-1 transition-transform duration-300 shadow-md hover:shadow-lg'>
			<CardHeader>
				<div className='flex items-center gap-3'>
					<div className='bg-blue-100 p-3 rounded-full'>
						<Ticket className='w-6 h-6' style={{ color: '#0E327F' }} />
					</div>
					<CardTitle className='text-xl' style={{ color: '#0E327F' }}>
						{title}
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className='flex flex-col flex-grow'>
				<CardDescription className='mb-4 flex-grow'>
					{description}
				</CardDescription>
				<div className='mt-auto border-t pt-4 space-y-2 text-sm'>
					<div className='flex items-center gap-2 text-gray-700'>
						<DollarSign className='w-4 h-4' />
						<strong>Fiyat:</strong>
						<span>{fiyat}</span>
					</div>
					<div className='flex items-center gap-2 text-gray-700'>
						<Calendar className='w-4 h-4' />
						<strong>Geçerlilik:</strong>
						<span>{gecerlilik}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
