import Cards from '@/pages/cards/cards'
import CompanySlider from '@/pages/company/CompanySlider'
import MetroCarousel from '@/pages/Header/header'
import YoutubeGrid from '@/pages/youtube/youtube'
import MetroInfo from '@/work/metroTime/metroTime'
import FaqAccordion from '@/work/test/questions'

const Home = () => {
	return (
		<div>
			<div className='my-5'>
				<MetroInfo />
			</div>
			<div className='mt-5'>
				<MetroCarousel />
			</div>
			<div className='my-10'>
				<Cards />
			</div>
			<div className='my-10 mt-15'>
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
