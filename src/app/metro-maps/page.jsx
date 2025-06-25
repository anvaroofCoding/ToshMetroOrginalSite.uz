import MetroStationSlider from './stations'

const Page = () => {
	return (
		<div>
			<div>
				<MetroStationSlider />
			</div>
			<div className='container'>
				<div>
					<h1 className='text-[36px] font-bold'>Metro Xaritasi</h1>
					<img
						src={
							'https://tashmetro.uz/wp-content/uploads/2025/03/%D0%92%D0%B0%D0%B3%D0%BE%D0%BD-%D1%80%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0-%D1%81%D1%85%D0%B5%D0%BC%D0%B0-57%D0%A551-scaled.jpg'
						}
						alt='Toshkent metro xaritasi'
					/>
				</div>
			</div>
		</div>
	)
}

export default Page
