'use client'

import { BusinessPlansViewer } from '@/components/open-data/business-plans-viewer'
import { useFinancialResultsPlansQuery } from '@/store/services/api'
import { useTranslations } from 'next-intl'

export default function BuxgalteriyaBalansi() {
	const t = useTranslations('openData.finance')
	const { data = [], isLoading, isError } = useFinancialResultsPlansQuery()

	return (
		<div className='min-h-screen py-8 sm:py-12 lg:py-16'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='mb-8 text-center sm:mb-10'>
					<h1 className='mb-3 text-2xl font-bold text-blue-900 sm:text-3xl lg:text-4xl'>
						{t('title')}
					</h1>
					<div className='mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 sm:w-20' />
					<p className='mx-auto mt-4 max-w-3xl text-sm text-blue-700 sm:text-base'>
						{t('subtitle')}
					</p>
				</div>

				<BusinessPlansViewer
					plans={data}
					isLoading={isLoading}
					isError={isError}
					messagesKey='openData.finance'
				/>
			</div>
		</div>
	)
}
