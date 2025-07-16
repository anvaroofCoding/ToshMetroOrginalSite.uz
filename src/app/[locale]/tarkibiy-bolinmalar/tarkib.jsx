import {
	Battery,
	Lock,
	Mountain,
	Newspaper,
	Phone,
	Radio,
	RouteIcon as Road,
	Settings,
	Shield,
	Train,
	Users,
	Zap,
} from 'lucide-react'

export default function TransportDirectory() {
	const departments = [
		{
			title: 'Kadrlar bilan ishlash xizmati',
			titleEn: 'Human Resources Service',
			head: 'Igamberdiyev Botir Raxmonberdiyevich',
			schedule: 'Dushanba-juma kunlari 08:00 dan 17:00 ga qadar',
			reception: 'Haftaning har chorshanbasida 14:00 dan 17:00 gacha',
			phone: '+99871-239-89-27',
			icon: Users,
		},
		{
			title: 'Harakat xizmati',
			titleEn: 'Movement Service',
			head: 'Xakimov Baxrom Askarovich',
			schedule: 'Dushanba-juma kunlari 08:00 dan 17:00 ga qadar',
			reception: 'Haftaning chorshanba kuni 14:00 dan 17:00 gacha',
			phone: '+99871-293-89-31',
			icon: Train,
		},
		{
			title: 'Chilonzor elektrodeposi',
			titleEn: 'Chilonzor Electrodepot',
			head: 'Shafikov Rustam Rafikovich',
			schedule: 'Dushanba-juma kunlari 08:00 dan 17:00 ga qadar',
			reception: 'Haftaning seshanba kuni 10:00 da',
			phone: '+998-93-500-25-20',
			icon: Zap,
		},
		{
			title: "O'zbekiston elektrodeposi",
			titleEn: 'Uzbekistan Electrodepot',
			head: "Shodmonov O'tkir Ahmadovich",
			schedule: 'Dushanba-juma kunlari 08:00 dan 17:00 ga qadar',
			reception: 'Haftaning seshanba kuni 10:00 da',
			phone: '+998-93-500-55-89',
			icon: Zap,
		},
		{
			title: 'Elektromexanika xizmati',
			titleEn: 'Electromechanical Service',
			head: "Abdusattorov Abduqodir Turg'unovich",
			schedule: 'Dushanba-juma kunlari 08:00 dan 17:00 ga qadar',
			reception: 'Haftaning seshanba kuni 09:00 da',
			phone: '+99893-501-79-70',
			icon: Settings,
		},
		{
			title: "Elektr ta'minot xizmati",
			titleEn: 'Power Supply Service',
			head: "Baxromov Behzod To'xtamurodovich",
			schedule: 'Dushanba-juma kunlari 08:00 dan 17:00 ga qadar',
			reception: 'Haftaning dushanba kuni 13:30 da',
			phone: '+99893-501-79-72',
			icon: Battery,
		},
		{
			title: 'Signallashtirish va aloqa xizmati',
			titleEn: 'Signaling and Communication Service',
			head: "Islomov Xojiakbar Shuxrat o'g'li",
			schedule: 'Dushanba-juma kunlari 08:00 dan 17:00 ga qadar',
			reception: 'Haftaning chorshanba kuni 14:00 dan 17:00 gacha',
			phone: '+998998026218',
			icon: Radio,
		},
		{
			title: "Yo'l xizmati",
			titleEn: 'Road Service',
			head: "Xolmurodov Ruslan Beknazar o'g'li",
			schedule: 'Dushanba-juma kunlari 08:00 dan 17:00 ga qadar',
			reception: 'Haftaning seshanba kuni 09:00 da',
			phone: '+99894-100-26-26',
			icon: Road,
		},
		{
			title: 'Tonnel inshootlari xizmati',
			titleEn: 'Tunnel Structures Service',
			head: 'Aliqulov Akmal Abdujabbarovich',
			schedule: 'Dushanba-juma kunlari 08:00 dan 17:00 ga qadar',
			reception: 'Haftaning seshanba kuni 14:00 da',
			phone: '+998-93-501-79-71',
			icon: Mountain,
		},
		{
			title: 'Korrupsiyani oldini olish xizmati',
			titleEn: 'Anti-Corruption Service',
			head: 'Kabirov Qobiljon Qosimovich',
			schedule: 'Dushanba-juma kunlari 08:00 dan 17:00 ga qadar',
			reception: '',
			phone: '+998-93-700-03-25',
			icon: Shield,
		},
		{
			title:
				"Axborot xavfsizligini ta'minlash va texnik xizmat ko'rsatish xizmati",
			titleEn: 'Information Security and Technical Support Service',
			head: "Toshpo'lotov Feruz G'olib o'g'li",
			schedule: 'Dushanba-juma kunlari 08:00 dan 17:00 ga qadar',
			reception: 'Payshanba kuni 15:00 dan 16:00 gacha',
			phone: '+998 71-241-31-40',
			icon: Lock,
		},
		{
			title: 'Matbuot xizmati',
			titleEn: 'Press Service',
			head: "Mirzayev To'ychi Farxod o'g'li",
			schedule: 'Dushanba-juma kunlari 08:00 dan 17:00 ga qadar',
			reception: 'Haftaning chorshanba kuni 14:00 dan 17:00 gacha',
			phone: '+998-90-370-19-98',
			icon: Newspaper,
		},
	]

	return (
		<div className='min-h-screen '>
			{/* Header */}
			<div className='relative overflow-hidden bg-white  border-gray-200'>
				<div className='absolute '></div>
				<div className='relative  mx-auto px-6 py-16'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-6xl font-bold mb-4 text-[#0E327F] drop-shadow-sm'>
							Transport Ma'lumotnomasi
						</h1>
						<p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
							Barcha transport xizmatlari va bo'limlarining to'liq aloqa
							ma'lumotlari
						</p>
					</div>
				</div>
				<div className='absolute bottom-0 left-0 right-0 h-px '></div>
			</div>

			{/* Directory Grid */}
			<div className='container  py-16'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{departments.map((dept, index) => (
						<div
							key={index}
							className='group relative bg-white rounded-2xl p-8 transition-all duration-100 hover:scale-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(14,50,127,0.3)]'
						>
							{/* Card Background Gradient */}
							<div className='absolute inset-0 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

							{/* Icon */}
							<div className='relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0E327F] to-[#1e4a9f] rounded-xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
								<dept.icon className='w-7 h-7 text-white' />
							</div>

							{/* Content */}
							<div className='relative space-y-4'>
								<div>
									<h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0E327F] transition-colors duration-300'>
										{dept.title}
									</h3>
									{/* <p className='text-sm text-gray-500 font-medium'>
										{dept.titleEn}
									</p> */}
								</div>

								<div className='space-y-3'>
									<div className='flex items-start space-x-3'>
										<div className='flex-shrink-0 w-5 h-5 bg-[#0E327F]/10 rounded-full flex items-center justify-center mt-0.5'>
											<div className='w-2 h-2 bg-[#0E327F] rounded-full'></div>
										</div>
										<div>
											<p className='text-sm font-semibold text-gray-700 mb-1'>
												Bo'lim boshlig'i
											</p>
											<p className='text-sm text-gray-600'>{dept.head}</p>
										</div>
									</div>

									<div className='flex items-start space-x-3'>
										<div className='flex-shrink-0 w-5 h-5 bg-[#0E327F]/10 rounded-full flex items-center justify-center mt-0.5'>
											<div className='w-2 h-2 bg-[#0E327F] rounded-full'></div>
										</div>
										<div>
											<p className='text-sm font-semibold text-gray-700 mb-1'>
												Ish jadvali
											</p>
											<p className='text-sm text-gray-600'>{dept.schedule}</p>
										</div>
									</div>

									{dept.reception && (
										<div className='flex items-start space-x-3'>
											<div className='flex-shrink-0 w-5 h-5 bg-[#0E327F]/10 rounded-full flex items-center justify-center mt-0.5'>
												<div className='w-2 h-2 bg-[#0E327F] rounded-full'></div>
											</div>
											<div>
												<p className='text-sm font-semibold text-gray-700 mb-1'>
													Qabul soatlari
												</p>
												<p className='text-sm text-gray-600'>
													{dept.reception}
												</p>
											</div>
										</div>
									)}

									<div className='flex items-center space-x-3 pt-2'>
										<div className='flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#0E327F] to-[#1e4a9f] rounded-lg flex items-center justify-center shadow-md'>
											<Phone className='w-4 h-4 text-white' />
										</div>
										<a
											href={`tel:${dept.phone}`}
											className='text-[#0E327F] font-semibold hover:text-[#1e4a9f] transition-colors duration-200 text-lg'
										>
											{dept.phone}
										</a>
									</div>
								</div>
							</div>

							{/* Hover Effect Border */}
							<div className='absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#0E327F]/20 transition-colors duration-300'></div>
						</div>
					))}
				</div>
			</div>

			{/* Footer */}
			<div className='bg-white py-12'>
				<div className='max-w-7xl mx-auto px-6 text-center'>
					<div className='inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#0E327F] to-[#1e4a9f] rounded-full mb-4 shadow-lg'>
						<Train className='w-6 h-6 text-white' />
					</div>
					<p className='text-lg text-gray-900 font-semibold'>
						Transport Xizmatlari Ma'lumotnomasi
					</p>
					<p className='text-sm text-gray-600 mt-2'>
						Barcha bo'limlar dushanba-juma kunlari 08:00-17:00 gacha ishlaydi
					</p>
				</div>
			</div>
		</div>
	)
}
