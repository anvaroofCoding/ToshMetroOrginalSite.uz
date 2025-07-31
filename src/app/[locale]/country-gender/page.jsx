import Image from 'next/image'

const Page = () => {
	return (
		<div className='bg-transparent min-h-screen'>
			<div className='container mx-auto px-4 py-8 max-w-4xl'>
				{/* Main Heading */}
				<h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-8 text-center leading-tight'>
					Yurtimizda gender tenglikni ta'minlash strategiyasi
				</h1>

				{/* Hero Image */}
				<div className='relative h-64 md:h-80 lg:h-150 mb-8 rounded-lg overflow-hidden shadow-lg'>
					<Image
						src='https://mintrans.uz/uploads/files/1287_1706710640.jpg?1707110135555'
						alt='Gender tenglik strategiyasi'
						fill
						className='object-contain'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'
					/>
				</div>

				{/* Quote Section */}
				<blockquote className='bg-blue-50 border-l-4 border-blue-900 p-6 mb-8 rounded-r-lg'>
					<h2 className='text-lg md:text-xl lg:text-2xl font-semibold text-blue-900 mb-4 leading-relaxed'>
						"Jamiyatni siyosiy, ijtimoiy va iqtisodiy modernizatsiya qilish
						bo'yicha keng ko'lamli chora-tadbirlarimiz natijasida yangi
						O'zbekiston shakllanmoqda"
					</h2>
				</blockquote>

				{/* Main Content */}
				<div className='prose prose-lg max-w-none'>
					<p className='text-gray-700 leading-relaxed text-base md:text-lg mb-6'>
						<span className='font-semibold text-blue-900'>
							Prezident Shavkat Mirziyoyev:
						</span>{' '}
						"Jamiyatni siyosiy, ijtimoiy va iqtisodiy modernizatsiya qilish
						bo'yicha keng ko'lamli chora-tadbirlarimiz natijasida yangi
						O'zbekiston shakllanmoqda. Bugungi kunda mamlakatimizdagi demokratik
						o'zgarishlar ortga qaytmaydigan tus oldi.
					</p>

					<p className='text-gray-700 leading-relaxed text-base md:text-lg mb-6'>
						O'tgan yili Parlamentga o'tkazilgan saylovlar aholi va
						partiyalarning siyosiy faolligi, fuqarolik jamiyati institutlarining
						roli, ommaviy axborot vositalarining ta'siri oshganini namoyish
						etdi. Biz uchun gender tenglik siyosati ustuvor masalaga aylandi.
						Xotin-qizlarning davlat boshqaruvidagi o'rni tobora kuchaymoqda.
					</p>

					<p className='text-gray-700 leading-relaxed text-base md:text-lg mb-6'>
						Yangi Parlamentimizda ayol deputatlar soni ikki barobarga ko'paydi.
						Inson huquqlari sohasidagi holat ham butunlay o'zgardi. Majburiy va
						bolalar mehnati to'liq tugatildi. Inson huquqlari bo'yicha Milliy
						strategiya qabul qilindi.
					</p>

					<p className='text-gray-700 leading-relaxed text-base md:text-lg mb-6'>
						Birlashgan Millatlar Tashkilotining fuqaroligi bo'lmagan insonlar
						sonini kamaytirishga qaratilgan chaqirig'iga javoban shu yilning
						o'zida 50 ming yurtdoshimizga O'zbekiston fuqaroligi berildi.
						Mamlakatimizda diniy erkinlik borasida ham vaziyat keskin
						yaxshilandi.
					</p>

					<p className='text-gray-700 leading-relaxed text-base md:text-lg mb-8'>
						Millatlararo totuvlik va dinlararo bag'rikenglikni yanada
						mustahkamlash biz uchun doimiy muhim vazifadir".
					</p>
				</div>
			</div>
		</div>
	)
}

export default Page
