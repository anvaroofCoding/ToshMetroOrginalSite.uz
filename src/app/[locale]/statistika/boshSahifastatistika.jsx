'use client'

import { ShowcaseCtaButton } from '@/components/main-informations/showcase-cta-button'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function BoshSahifastatistika() {
	const t = useTranslations('menu')
	const [animationError, setAnimationError] = useState(false)

	return (
		<div className='relative bg-gradient-to-r from-blue-800 to-blue-700 rounded-3xl p-8 text-white shadow-lg overflow-hidden flex flex-col lg:flex-row items-center justify-between'>
			{/* Pattern background */}
			<div className='absolute inset-0 z-0 opacity-20'>
				<div
					className='w-full h-full bg-repeat'
					style={{
						backgroundImage: 'url("/naqsh.png")',
						backgroundRepeat: 'repeat',
						backgroundSize: '200px',
					}}
				/>
			</div>

			{/* Text content */}
			<div className='lg:w-2/3 space-y-4 z-10 text-center lg:text-left'>
				<h1 className='text-3xl lg:text-4xl font-bold'>{t('heading')}</h1>
				<p className='text-lg opacity-90 max-w-xl mx-auto lg:mx-0'>{t('info')}</p>
				<ShowcaseCtaButton href='/statistika'>{t('cta')}</ShowcaseCtaButton>
			</div>

			{/* Lottie animation */}
			<div className='lg:w-2/5 mt-6 lg:mt-0 flex justify-center z-10'>
				{!animationError ? (
					<DotLottieReact
						src='/lottie/statistika.json'
						loop
						autoplay
						onError={e => {
							console.error('DotLottie animation error:', e)
							setAnimationError(true)
						}}
						style={{ maxWidth: '100%', height: 'auto', minHeight: 180 }}
					/>
				) : (
					<p className='text-white'>Animatsiya yuklanmadi</p>
				)}
			</div>
		</div>
	)
}
