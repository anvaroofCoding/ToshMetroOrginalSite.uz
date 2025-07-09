'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
	Calendar,
	Flag,
	MapPin,
	Music,
	Palette,
	Pause,
	Play,
	Shield,
	Users,
	Volume2,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import flag from '../../../public/ramzlar/Ozbekiston-bayrogi.jpg'
import gerb from '../../../public/ramzlar/gerb_big.jpg'

export default function UzbekistanSymbols() {
	const [isPlaying, setIsPlaying] = useState(false)
	const [activeTab, setActiveTab] = useState('flag')

	const tabs = [
		{ id: 'flag', label: 'Bayroq', icon: Flag },
		{ id: 'coat', label: 'Gerb', icon: Shield },
		{ id: 'anthem', label: 'Madhiya', icon: Music },
	]

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
			{/* Header */}
			<header className='text-[#0E327F] bg-white/80 backdrop-blur-sm'>
				<div className='max-w-7xl mx-auto px-6 py-8'>
					<div className='text-center mb-5'>
						<h1 className='text-4xl font-bold mb-2 drop-shadow-md'>
							O'ZBEKISTON RESPUBLIKASI
						</h1>
						<p className='text-xl text-gray-700 drop-shadow-sm'>
							Davlat Ramzlari
						</p>
					</div>

					{/* Navigation Tabs */}
					{/* <div className='flex justify-evenly  mt-8 space-x-1 bg-[#0E327F] p-1 rounded-lg mx-auto'>
						{tabs.map(tab => {
							const Icon = tab.icon
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`flex items-center space-x-2 md:px-6 px-2 py-3 rounded-md transition-all duration-300 text-sm ${
										activeTab === tab.id
											? 'bg-white text-[#0E327F] shadow-lg transform scale-105'
											: 'text-blue-100 hover:text-white hover:bg-blue-800/50 hover:shadow-md'
									}`}
								>
									<Icon className='w-4 h-4' />
									<span className='font-medium'>{tab.label}</span>
								</button>
							)
						})}
					</div> */}
					<div className='relative container flex bg-[#0E327F] p-1 rounded-lg'>
						{/* Animated background indicator */}
						<motion.div
							className='absolute top-1 bottom-1 bg-white rounded-md shadow-lg'
							initial={false}
							animate={{
								left: `${
									(tabs.findIndex(tab => tab.id === activeTab) * 100) /
									tabs.length
								}%`,
								width: `${100 / tabs.length}%`,
							}}
							transition={{
								type: 'spring',
								stiffness: 300,
								damping: 30,
							}}
							style={{
								marginLeft: '0.125rem',
								marginRight: '0.125rem',
								width: `calc(${100 / tabs.length}% - 0.25rem)`,
							}}
						/>

						{/* Tab buttons */}
						{tabs.map((tab, index) => {
							const Icon = tab.icon
							const isActive = activeTab === tab.id

							return (
								<motion.button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`
                relative z-10 flex-1 flex items-center justify-center space-x-2 
                py-3 px-2 rounded-md transition-colors duration-200 text-sm font-medium
                ${
									isActive ? 'text-[#0E327F]' : 'text-blue-100 hover:text-white'
								}
              `}
									whileHover={{ scale: isActive ? 1 : 1.02 }}
									whileTap={{ scale: 0.98 }}
									transition={{ duration: 0.1 }}
								>
									<motion.div
										animate={{
											scale: isActive ? 1.1 : 1,
											rotate: isActive ? [0, -5, 5, 0] : 0,
										}}
										transition={{
											duration: 0.3,
											rotate: { duration: 0.5 },
										}}
									>
										<Icon className='w-4 h-4' />
									</motion.div>

									<motion.span
										animate={{
											fontWeight: isActive ? 600 : 500,
										}}
										transition={{ duration: 0.2 }}
										className='hidden sm:inline'
									>
										{tab.label}
									</motion.span>

									{/* Mobile: Show label on active tab only */}
									<motion.span
										initial={{ opacity: 0, width: 0 }}
										animate={{
											opacity: isActive ? 1 : 0,
											width: isActive ? 'auto' : 0,
										}}
										transition={{ duration: 0.2 }}
										className='sm:hidden text-xs overflow-hidden whitespace-nowrap'
									>
										{tab.label}
									</motion.span>
								</motion.button>
							)
						})}
					</div>
				</div>
			</header>

			<main className='max-w-7xl mx-auto px-6 py-8'>
				{/* Flag Section */}
				{activeTab === 'flag' && (
					<div className='space-y-8'>
						<div className='grid lg:grid-cols-3 gap-8'>
							{/* Flag Image */}
							<div className='lg:col-span-1'>
								<Card className='overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1'>
									<div className='bg-white border-0 p-6'>
										<div className='relative'>
											<Image
												src={flag}
												alt="O'zbekiston bayrog'i"
												width={400}
												height={267}
												className='w-full h-auto rounded-lg shadow-xl'
											/>
											<div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg'></div>
										</div>
										<div className='mt-4 text-center'>
											<Badge className='bg-[#0E327F] text-white shadow-lg hover:shadow-xl transition-shadow duration-200'>
												1991-yil 18-noyabr
											</Badge>
										</div>
									</div>
								</Card>
							</div>

							{/* Flag Details */}
							<div className='lg:col-span-2 space-y-6'>
								<Card className='shadow-xl hover:shadow-2xl transition-all duration-300 border-0'>
									<CardContent className='p-6'>
										<div className='flex items-center space-x-3 mb-4'>
											<div className='p-2 bg-[#0E327F]/10 rounded-lg shadow-inner'>
												<Calendar className='w-5 h-5 text-[#0E327F]' />
											</div>
											<h2 className='text-2xl font-bold text-[#0E327F] drop-shadow-sm'>
												Asosiy Ma'lumotlar
											</h2>
										</div>
										<div className='grid md:grid-cols-2 gap-6'>
											<div className='space-y-3'>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Qabul sanasi:
													</span>
													<span className='font-semibold'>18.11.1991</span>
												</div>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Muallif:
													</span>
													<span className='font-semibold'>
														Mirabror Usmanov
													</span>
												</div>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Nisbat:
													</span>
													<span className='font-semibold'>1:2</span>
												</div>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Ranglar soni:
													</span>
													<span className='font-semibold'>4 ta</span>
												</div>
											</div>
											<div className='space-y-3'>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Yulduzlar:
													</span>
													<span className='font-semibold'>12 ta</span>
												</div>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Hilol:
													</span>
													<span className='font-semibold'>1 ta</span>
												</div>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Chiziqlar:
													</span>
													<span className='font-semibold'>2 ta qizil</span>
												</div>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Status:
													</span>
													<span className='font-semibold text-green-600'>
														Faol
													</span>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card className='shadow-xl hover:shadow-2xl transition-all duration-300 border-0'>
									<CardContent className='p-6'>
										<div className='flex items-center space-x-3 mb-4'>
											<div className='p-2 bg-[#0E327F]/10 rounded-lg shadow-inner'>
												<Palette className='w-5 h-5 text-[#0E327F]' />
											</div>
											<h3 className='text-xl font-bold text-[#0E327F] drop-shadow-sm'>
												Ranglar Ramziyati
											</h3>
										</div>
										<div className='grid md:grid-cols-3 gap-4'>
											<div className='bg-[#0099CC] text-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'>
												<div className='font-bold text-lg mb-2 drop-shadow-md'>
													KO'K
												</div>
												<ul className='text-sm space-y-1'>
													<li>• Osmon va suv</li>
													<li>• Abadiylik</li>
													<li>• Tengri ramzi</li>
													<li>• Ma'naviyat</li>
												</ul>
											</div>
											<div className='bg-white border border-gray-200 text-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'>
												<div className='font-bold text-lg mb-2 drop-shadow-sm'>
													OQ
												</div>
												<ul className='text-sm space-y-1'>
													<li>• Tinchlik</li>
													<li>• Poklik</li>
													<li>• Halollik</li>
													<li>• Paxta (oq oltin)</li>
												</ul>
											</div>
											<div className='bg-[#00CC66] text-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'>
												<div className='font-bold text-lg mb-2 drop-shadow-md'>
													YASHIL
												</div>
												<ul className='text-sm space-y-1'>
													<li>• Tabiat</li>
													<li>• Yangilanish</li>
													<li>• Islom dini</li>
													<li>• Umid</li>
												</ul>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Detailed Symbolism */}
						<Card className='shadow-2xl hover:shadow-3xl transition-all duration-300 border-0'>
							<CardContent className='p-6'>
								<h3 className='text-xl font-bold text-[#0E327F] mb-6 drop-shadow-sm'>
									Batafsil Ramziy Ma'no
								</h3>
								<div className='grid md:grid-cols-2 gap-8'>
									<div className='space-y-4'>
										<div className='border-l-4 border-[#0E327F] pl-4 bg-blue-50/30 p-4 rounded-r-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
											<h4 className='font-bold text-lg mb-2 drop-shadow-sm'>
												🌙 Hilol (Yarim oy)
											</h4>
											<p className='text-gray-700'>
												O'zbekiston xalqining yangi tarixiy davr boshlashi.
												Islom dinining muhim belgisi. Ma'naviy poklik va yuksak
												maqsadlar ramzi. Mustaqillik va erkinlik timsoli.
											</p>
										</div>
										<div className='border-l-4 border-[#0E327F] pl-4 bg-blue-50/30 p-4 rounded-r-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
											<h4 className='font-bold text-lg mb-2 drop-shadow-sm'>
												⭐ 12 Yulduz
											</h4>
											<p className='text-gray-700'>
												Qadimiy o'zbek xalqining 12 burji. Yil davomidagi 12 oy.
												O'zbekistondagi 12 viloyat. Xalqimizning qadimiy
												astronomiya bilimlari. Vaqt va makon tushunchasi.
											</p>
										</div>
									</div>
									<div className='space-y-4'>
										<div className='border-l-4 border-red-500 pl-4 bg-red-50/30 p-4 rounded-r-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
											<h4 className='font-bold text-lg mb-2 drop-shadow-sm'>
												🔴 Qizil Chiziqlar
											</h4>
											<p className='text-gray-700'>
												Hayot kuchi va energiya. Xalqimizning jasur ruhi. Kurash
												qobiliyati va kelajakka ishonch. Faollik va harakat
												ramzi.
											</p>
										</div>
										<div className='border-l-4 border-[#0E327F] pl-4 bg-blue-50/30 p-4 rounded-r-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
											<h4 className='font-bold text-lg mb-2 drop-shadow-sm'>
												📏 Nisbat 1:2
											</h4>
											<p className='text-gray-700'>
												Xalqaro standartlarga muvofiq. Harmoniya va muvozanat.
												Klassik bayroq proportiyasi. Estetik jihatdan mukammal
												ko'rinish.
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				{/* Coat of Arms Section */}
				{activeTab === 'coat' && (
					<div className='space-y-8'>
						<div className='grid lg:grid-cols-3 gap-8'>
							{/* Coat of Arms Image */}
							<div className='lg:col-span-1'>
								<Card className='overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1'>
									<div className='bg-white border-0 p-6'>
										<div className='relative'>
											<Image
												src={gerb}
												alt="O'zbekiston gerbi"
												width={300}
												height={400}
												className='w-full h-auto rounded-lg shadow-xl'
											/>
											<div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg'></div>
										</div>
										<div className='mt-4 text-center'>
											<Badge className='bg-[#0E327F] text-white shadow-lg hover:shadow-xl transition-shadow duration-200'>
												1992-yil 2-iyul
											</Badge>
										</div>
									</div>
								</Card>
							</div>

							{/* Coat of Arms Details */}
							<div className='lg:col-span-2 space-y-6'>
								<Card className='shadow-xl hover:shadow-2xl transition-all duration-300 border-0'>
									<CardContent className='p-6'>
										<div className='flex items-center space-x-3 mb-4'>
											<div className='p-2 bg-[#0E327F]/10 rounded-lg shadow-inner'>
												<Users className='w-5 h-5 text-[#0E327F]' />
											</div>
											<h2 className='text-2xl font-bold text-[#0E327F] drop-shadow-sm'>
												Yaratuvchilar
											</h2>
										</div>
										<div className='grid md:grid-cols-2 gap-6'>
											<div className='space-y-3'>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Qabul sanasi:
													</span>
													<span className='font-semibold'>02.07.1992</span>
												</div>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Bosh muallif:
													</span>
													<span className='font-semibold'>Elbek Rizayev</span>
												</div>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Hammuallif:
													</span>
													<span className='font-semibold'>
														Akmal Turdikulov
													</span>
												</div>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Tasdiqlagan:
													</span>
													<span className='font-semibold'>Oliy Kengash</span>
												</div>
											</div>
											<div className='space-y-3'>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Elementlar:
													</span>
													<span className='font-semibold'>8 ta asosiy</span>
												</div>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Ranglar:
													</span>
													<span className='font-semibold'>Ko'p rangli</span>
												</div>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Shakl:
													</span>
													<span className='font-semibold'>Dumaloq</span>
												</div>
												<div className='flex justify-between p-3 bg-gray-50/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
													<span className='font-medium text-gray-600'>
														Status:
													</span>
													<span className='font-semibold text-green-600'>
														Rasmiy
													</span>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card className='shadow-xl hover:shadow-2xl transition-all duration-300 border-0'>
									<CardContent className='p-6'>
										<div className='flex items-center space-x-3 mb-4'>
											<div className='p-2 bg-[#0E327F]/10 rounded-lg shadow-inner'>
												<MapPin className='w-5 h-5 text-[#0E327F]' />
											</div>
											<h3 className='text-xl font-bold text-[#0E327F] drop-shadow-sm'>
												Gerb Elementlari
											</h3>
										</div>
										<div className='grid md:grid-cols-2 gap-6'>
											<div className='space-y-4'>
												<div className='bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-x-1'>
													<h4 className='font-bold text-lg mb-2 drop-shadow-sm'>
														🦅 Humo Qushi
													</h4>
													<p className='text-sm text-gray-700'>
														Baxt va erkinlik ramzi. Hech qachon yerga qo'nmaydi.
														Podshohlik va ulug'vorlik belgisi.
													</p>
												</div>
												<div className='bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-x-1'>
													<h4 className='font-bold text-lg mb-2 drop-shadow-sm'>
														☀️ Quyosh
													</h4>
													<p className='text-sm text-gray-700'>
														Yorug'lik va hayot manbai. Energiya va kuch. Barcha
														jonzotlarga hayot beruvchi.
													</p>
												</div>
												<div className='bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-x-1'>
													<h4 className='font-bold text-lg mb-2 drop-shadow-sm'>
														🏔️ Tog'lar
													</h4>
													<p className='text-sm text-gray-700'>
														Tyan-Shan va Pamir-Oloy. Tabiiy boylik va
														mustahkamlik ramzi.
													</p>
												</div>
												<div className='bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-x-1'>
													<h4 className='font-bold text-lg mb-2 drop-shadow-sm'>
														🌊 Daryolar
													</h4>
													<p className='text-sm text-gray-700'>
														Amudaryo va Sirdaryo. Suv resurslari va hayot
														manbai.
													</p>
												</div>
											</div>
											<div className='space-y-4'>
												<div className='bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-x-1'>
													<h4 className='font-bold text-lg mb-2 drop-shadow-sm'>
														🌾 Bug'doy
													</h4>
													<p className='text-sm text-gray-700'>
														Dehqonchilik va farovonlik. Asosiy oziq-ovqat
														mahsuloti.
													</p>
												</div>
												<div className='bg-gray-50 p-4 rounded-lg border-l-4 border-gray-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-x-1'>
													<h4 className='font-bold text-lg mb-2 drop-shadow-sm'>
														🤍 Paxta
													</h4>
													<p className='text-sm text-gray-700'>
														Oq oltin. Asosiy ekin turi va eksport mahsuloti.
													</p>
												</div>
												<div className='bg-green-50 p-4 rounded-lg border-l-4 border-green-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-x-1'>
													<h4 className='font-bold text-lg mb-2 drop-shadow-sm'>
														🎗️ Lenta
													</h4>
													<p className='text-sm text-gray-700'>
														Bayroq ranglari. Davlat ramzlarining birligi.
													</p>
												</div>
												<div className='bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-x-1'>
													<h4 className='font-bold text-lg mb-2 drop-shadow-sm'>
														📝 Yozuv
													</h4>
													<p className='text-sm text-gray-700'>
														"O'ZBEKISTON RESPUBLIKASI" - rasmiy davlat nomi.
													</p>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Detailed Analysis */}
						<Card className='shadow-2xl hover:shadow-3xl transition-all duration-300 border-0'>
							<CardContent className='p-6'>
								<h3 className='text-xl font-bold text-[#0E327F] mb-6 drop-shadow-sm'>
									Gerbning Chuqur Tahlili
								</h3>
								<div className='grid md:grid-cols-3 gap-6'>
									<div className='space-y-4 p-4 bg-blue-50/30 rounded-lg shadow-inner'>
										<h4 className='font-bold text-lg text-[#0E327F] drop-shadow-sm'>
											Markaziy Qism
										</h4>
										<p className='text-gray-700'>
											Humo qushi gerbning markazida joylashgan bo'lib, ochilgan
											qanotlari bilan tasvirlangan. Bu O'zbekistonning erkinlik
											va mustaqilligini anglatadi.
										</p>
										<p className='text-gray-700'>
											Quyosh Humo qushining orqasida joylashib, yangi kun va
											yangi hayotning boshlanishini bildiradi.
										</p>
									</div>
									<div className='space-y-4 p-4 bg-green-50/30 rounded-lg shadow-inner'>
										<h4 className='font-bold text-lg text-[#0E327F] drop-shadow-sm'>
											Tabiiy Elementlar
										</h4>
										<p className='text-gray-700'>
											Tog'lar va daryolar O'zbekistonning geografik
											xilma-xilligini ko'rsatadi. Bu elementlar mamlakatning
											tabiiy boyligini ifodalaydi.
										</p>
										<p className='text-gray-700'>
											Bug'doy va paxta dehqonchilik madaniyatini va iqtisodiy
											asosni bildiradi.
										</p>
									</div>
									<div className='space-y-4 p-4 bg-amber-50/30 rounded-lg shadow-inner'>
										<h4 className='font-bold text-lg text-[#0E327F] drop-shadow-sm'>
											Ramziy Ma'no
										</h4>
										<p className='text-gray-700'>
											Barcha elementlar birgalikda O'zbekistonning boy tarixi,
											madaniyati va kelajak istiqbollarini ifodalaydi.
										</p>
										<p className='text-gray-700'>
											Gerb milliy o'ziga xoslik va zamonaviy davlat maqomini
											muvozanatli tarzda aks ettiradi.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				{/* National Anthem Section */}
				{activeTab === 'anthem' && (
					<div className='space-y-8'>
						<div className='grid lg:grid-cols-2 gap-8'>
							{/* Anthem Info */}
							<Card className='shadow-xl hover:shadow-2xl transition-all duration-300 border-0'>
								<CardContent className='p-6'>
									<div className='flex items-center space-x-3 mb-4'>
										<div className='p-2 bg-[#0E327F]/10 rounded-lg shadow-inner'>
											<Volume2 className='w-5 h-5 text-[#0E327F]' />
										</div>
										<h2 className='text-2xl font-bold text-[#0E327F] drop-shadow-sm'>
											Texnik Ma'lumotlar
										</h2>
									</div>
									<div className='space-y-4'>
										<div className='grid grid-cols-2 gap-4'>
											<div className='bg-gray-50 p-3 rounded shadow-sm hover:shadow-md transition-shadow duration-200'>
												<div className='text-sm text-gray-600'>
													Qabul sanasi
												</div>
												<div className='font-semibold'>10.12.1992</div>
											</div>
											<div className='bg-gray-50 p-3 rounded shadow-sm hover:shadow-md transition-shadow duration-200'>
												<div className='text-sm text-gray-600'>Davomiyligi</div>
												<div className='font-semibold'>1:47</div>
											</div>
											<div className='bg-gray-50 p-3 rounded shadow-sm hover:shadow-md transition-shadow duration-200'>
												<div className='text-sm text-gray-600'>Tonal</div>
												<div className='font-semibold'>F-major</div>
											</div>
											<div className='bg-gray-50 p-3 rounded shadow-sm hover:shadow-md transition-shadow duration-200'>
												<div className='text-sm text-gray-600'>Temp</div>
												<div className='font-semibold'>Andante</div>
											</div>
										</div>
										<div className='border-t pt-4'>
											<h3 className='font-bold text-lg mb-3 drop-shadow-sm'>
												Mualliflar
											</h3>
											<div className='space-y-3'>
												<div className='bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1'>
													<h4 className='font-bold drop-shadow-sm'>
														Mutal Burhonov (1916-2002)
													</h4>
													<p className='text-sm text-gray-700'>
														Mashhur kompozitor, O'zbekiston xalq artisti. 100+
														qo'shiq muallifi.
													</p>
												</div>
												<div className='bg-green-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1'>
													<h4 className='font-bold drop-shadow-sm'>
														Abdulla Oripov (1941-2016)
													</h4>
													<p className='text-sm text-gray-700'>
														Taniqli shoir, O'zbekiston xalq shoiri. 40+ she'riy
														to'plam.
													</p>
												</div>
											</div>
										</div>
										<div className='text-center pt-4'>
											<Button
												onClick={() => setIsPlaying(!isPlaying)}
												className='bg-[#0E327F] hover:bg-blue-800 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200'
											>
												{isPlaying ? (
													<>
														<Pause className='w-5 h-5 mr-2' />
														To'xtatish
													</>
												) : (
													<>
														<Play className='w-5 h-5 mr-2' />
														Tinglash
													</>
												)}
											</Button>
										</div>

										{isPlaying && (
											<div className='bg-[#0E327F] text-white p-4 rounded-lg text-center shadow-xl animate-pulse'>
												<div className='flex justify-center space-x-1 mb-2'>
													{[...Array(5)].map((_, i) => (
														<div
															key={i}
															className='w-2 bg-white rounded h-6 shadow-sm'
														></div>
													))}
												</div>
												<p className='text-sm drop-shadow-sm'>
													Madhiya ijro etilmoqda...
												</p>
											</div>
										)}
									</div>
								</CardContent>
							</Card>

							{/* Lyrics */}
							<Card className='shadow-xl hover:shadow-2xl transition-all duration-300 border-0'>
								<CardContent className='p-6'>
									<h2 className='text-2xl font-bold text-[#0E327F] mb-4 text-center drop-shadow-sm'>
										Madhiya Matni
									</h2>
									<div className='space-y-4'>
										<div className='bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
											<h3 className='font-bold text-center mb-2 drop-shadow-sm'>
												1-misra
											</h3>
											<div className='text-center space-y-1 text-sm'>
												<p>Serquyosh hur o'lkam, elga baxt, najot,</p>
												<p>Sen o'zing do'stlarga yo'ldosh, mehribon!</p>
												<p>Yashnagay to abad ilmu fan, ijod,</p>
												<p>Shuhrating porlasin toki bor jahon!</p>
											</div>
										</div>
										<div className='bg-[#0E327F] text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200'>
											<h3 className='font-bold text-center mb-2 drop-shadow-md'>
												NAQORAT
											</h3>
											<div className='text-center space-y-1 text-sm'>
												<p>Oltin bu vodiylar — jon O'zbekiston,</p>
												<p>Ajdodlar mardona ruhi senga yor!</p>
												<p>Ulug' xalq qudrati jo'sh urgan zamon,</p>
												<p>Olamni mahliyo aylagan diyor!</p>
											</div>
										</div>
										<div className='bg-green-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
											<h3 className='font-bold text-center mb-2 drop-shadow-sm'>
												2-misra
											</h3>
											<div className='text-center space-y-1 text-sm'>
												<p>Bag'ri keng o'zbekning o'chmas iymoni,</p>
												<p>Erkin, yosh avlodlar senga zo'r qanot!</p>
												<p>Istiqlol mash'ali, tinchlik posboni,</p>
												<p>Haqsevar, ona yurt, mangu bo'l obod!</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Translation and Analysis */}
						<div className='grid md:grid-cols-2 gap-8'>
							<Card className='shadow-xl hover:shadow-2xl transition-all duration-300 border-0'>
								<CardContent className='p-6'>
									<h3 className='text-xl font-bold text-[#0E327F] mb-4 drop-shadow-sm'>
										English Translation
									</h3>
									<div className='space-y-3 text-sm text-gray-700'>
										<div className='p-3 bg-blue-50/50 rounded-lg shadow-sm'>
											<strong>Verse 1:</strong>
											<p className='italic mt-1'>
												"My sunny free land, happiness and salvation to your
												people, You are a companion to friends, generous! May
												knowledge and creativity flourish forever, May your
												glory shine as long as the world exists!"
											</p>
										</div>
										<div className='p-3 bg-[#0E327F]/10 rounded-lg shadow-sm'>
											<strong>Chorus:</strong>
											<p className='italic mt-1'>
												"These golden valleys — dear Uzbekistan, The courageous
												spirit of ancestors is with you! The time when great
												people's power surged, The land that made the world
												beautiful!"
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card className='shadow-xl hover:shadow-2xl transition-all duration-300 border-0'>
								<CardContent className='p-6'>
									<h3 className='text-xl font-bold text-[#0E327F] mb-4 drop-shadow-sm'>
										Madhiya Tahlili
									</h3>
									<div className='space-y-3 text-sm'>
										<div className='border-l-4 border-blue-500 pl-3 bg-blue-50/30 p-3 rounded-r-lg shadow-sm'>
											<strong>Asosiy g'oya:</strong>
											<p className='text-gray-700 mt-1'>
												Vatanparvarlik, mustaqillik g'ururi, kelajakka ishonch
											</p>
										</div>
										<div className='border-l-4 border-green-500 pl-3 bg-green-50/30 p-3 rounded-r-lg shadow-sm'>
											<strong>Kalit so'zlar:</strong>
											<p className='text-gray-700 mt-1'>
												Baxt, najot, ilm-fan, ijod, erkinlik, tinchlik
											</p>
										</div>
										<div className='border-l-4 border-yellow-500 pl-3 bg-yellow-50/30 p-3 rounded-r-lg shadow-sm'>
											<strong>Ramziy ma'no:</strong>
											<p className='text-gray-700 mt-1'>
												O'zbekistonning boy tarixi, madaniyati va yorqin
												kelajagi
											</p>
										</div>
										<div className='border-l-4 border-red-500 pl-3 bg-red-50/30 p-3 rounded-r-lg shadow-sm'>
											<strong>Musiqa xususiyati:</strong>
											<p className='text-gray-700 mt-1'>
												Tantanali, ko'tarinki, milliy ruh aks etgan
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				)}
			</main>
		</div>
	)
}
