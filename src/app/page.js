import Cards from '@/pages/cards/cards'
import MetroCarousel from '@/pages/Header/header'
import YoutubeGrid from '@/pages/youtube/youtube'

const Home = () => {
	return (
		<div>
			<div className='mt-5'>
				<MetroCarousel />
			</div>
			<div className='my-10'>
				<Cards />
			</div>
			<div className='my-10 mt-15'>
				<div className='container'>
					<h2 className='text-[36px] font-bold'>
						Toshkent metrosi haqida qiziqarli videolar
					</h2>
				</div>
				<YoutubeGrid />
			</div>
		</div>
	)
}

export default Home
