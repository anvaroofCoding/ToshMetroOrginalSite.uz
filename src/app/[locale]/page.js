import MetroMapAdCard from '@/components/MetroReklamakartasi/metro-map-kars'
import CompanySlider from '@/pages/company/CompanySlider'
import Component from '@/pages/diagramma/diagramma'
import MetroCarouselWithNews from '@/pages/Header/header'
import YoutubeGrid from '@/pages/youtube/youtube'
import MetroSystem from '@/work/metroTime/metroTime'
import FaqAccordion from '@/work/test/questions'

const Home = () => {
	return (
		<div className='relative z-[10]'>
			<div className='my-5'>
				<MetroSystem />
			</div>
			<div className='mt-5'>
				<MetroCarouselWithNews />
			</div>
			<div className='my-5'>
				<Component />
			</div>
			<div className='my-10 mb-15'>
				<MetroMapAdCard />
			</div>
			<div>
				<div className='container'>
					<h2 className='text-[36px] font-bold'>Qiziqarli lavhalar</h2>
				</div>
				<YoutubeGrid />
			</div>
			<div className='my-10'>
				<FaqAccordion />
			</div>
			<div className='my-10'>
				<CompanySlider />
			</div>
		</div>
	)
}

export default Home
