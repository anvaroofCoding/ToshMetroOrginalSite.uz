'use client'

import { Badge } from '@/components/ui/badge'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Award,
	Building2,
	Heart,
	Scale,
	Shield,
	TrendingUp,
	UserCheck,
	Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function TashkentMetroDashboard() {
	const [animatedStats, setAnimatedStats] = useState({
		totalEmployees: 0,
		womenEmployees: 0,
		menEmployees: 0,
		womenPercentage: 0,
		menPercentage: 0,
	})

	const [currentSection, setCurrentSection] = useState(0)

	const finalStats = {
		totalEmployees: 6184,
		womenEmployees: 2616,
		menEmployees: 3543,
		womenPercentage: 42,
		menPercentage: 58,
	}

	useEffect(() => {
		const duration = 2000
		const steps = 60
		const stepDuration = duration / steps

		let currentStep = 0
		const timer = setInterval(() => {
			currentStep++
			const progress = currentStep / steps

			setAnimatedStats({
				totalEmployees: Math.floor(finalStats.totalEmployees * progress),
				womenEmployees: Math.floor(finalStats.womenEmployees * progress),
				menEmployees: Math.floor(finalStats.menEmployees * progress),
				womenPercentage: Math.floor(finalStats.womenPercentage * progress),
				menPercentage: Math.floor(finalStats.menPercentage * progress),
			})

			if (currentStep >= steps) {
				clearInterval(timer)
				setAnimatedStats(finalStats)
			}
		}, stepDuration)

		return () => clearInterval(timer)
	}, [])

	const initiatives = [
		{
			icon: Scale,
			title: 'Teng Huquqlar',
			description: 'Erkaklar va ayollar uchun teng imkoniyatlar yaratilgan',
			color: 'bg-blue-500',
		},
		{
			icon: UserCheck,
			title: 'Shaffof Tanlov',
			description: 'Ochiq mustaqil tanlov asosida kadrlar tanlash jarayoni',
			color: 'bg-green-500',
		},
		{
			icon: Heart,
			title: "Oilaviy Qo'llab-quvvatlash",
			description: 'Homilador ayollar va bolali onalar uchun maxsus kafolatlar',
			color: 'bg-pink-500',
		},
		{
			icon: Shield,
			title: 'Huquqiy Himoya',
			description:
				'Xodimlarning ijtimoiy himoyasi va huquqiy bilimini oshirish',
			color: 'bg-purple-500',
		},
	]

	const achievements = [
		{ label: 'Maslahat Kengashi', value: 'Faol', icon: Building2 },
		{ label: "Huquqiy Targ'ibot", value: 'Doimiy', icon: Award },
		{ label: "Anonim So'rov", value: 'Tizimli', icon: TrendingUp },
	]

	return (
		<div className='min-h-screen container bg-gradient-to-br from-slate-50 to-blue-50'>
			{/* Header */}
			<div className='bg-white border-b border-gray-100 py-12 px-4'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center space-y-6'>
						<h1 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#0E327F] via-blue-600 to-[#0E327F] bg-clip-text text-transparent leading-tight'>
							Gender Tenglik
						</h1>
						<p className='text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
							Ayollar va erkaklar uchun teng huquq va imkoniyatlarni ta'minlash
							bo'yicha statistika va yutuqlar
						</p>
						<div className='flex flex-wrap justify-center gap-4 pt-4'>
							<div className='bg-gradient-to-r from-[#0E327F] to-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg'>
								6,184 Jami Xodim
							</div>
							<div className='bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg'>
								42% Ayollar
							</div>
							<div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg'>
								58% Erkaklar
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 py-12 space-y-12'>
				{/* Main Statistics */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<Card className='relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-gradient-to-br from-white via-blue-50/30 to-white shadow-xl'>
						<CardHeader className='pb-3'>
							<CardTitle className='flex items-center gap-2 text-[#0E327F]'>
								<Users className='w-5 h-5' />
								Jami Xodimlar
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='text-4xl font-bold text-[#0E327F] mb-2'>
								{animatedStats.totalEmployees.toLocaleString()}
							</div>
							<div className='text-sm text-gray-600'>
								Toshkent metropolitenida faoliyat yurituvchi xodimlar soni
							</div>
						</CardContent>
						<div className='absolute top-0 right-0 w-20 h-20 bg-[#0E327F]/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500'></div>
					</Card>

					<Card className='relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-gradient-to-br from-white via-blue-50/30 to-white shadow-xl'>
						<CardHeader className='pb-3'>
							<CardTitle className='flex items-center gap-2 text-pink-600'>
								<Users className='w-5 h-5' />
								Ayol Xodimlar
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='text-4xl font-bold text-pink-600 mb-2'>
								{animatedStats.womenEmployees.toLocaleString()}
							</div>
							<div className='flex items-center gap-2 mb-2'>
								<div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
									<div
										className='h-full bg-pink-500 rounded-full transition-all duration-1000 ease-out'
										style={{ width: `${animatedStats.womenPercentage}%` }}
									></div>
								</div>
								<span className='text-sm font-semibold text-pink-600'>
									{animatedStats.womenPercentage}%
								</span>
							</div>
							<div className='text-sm text-gray-600'>
								Jami xodimlarning {animatedStats.womenPercentage} foizini
								tashkil etadi
							</div>
						</CardContent>
						<div className='absolute top-0 right-0 w-20 h-20 bg-pink-500/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500'></div>
					</Card>

					<Card className='relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-gradient-to-br from-white via-blue-50/30 to-white shadow-xl'>
						<CardHeader className='pb-3'>
							<CardTitle className='flex items-center gap-2 text-blue-600'>
								<Users className='w-5 h-5' />
								Erkak Xodimlar
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='text-4xl font-bold text-blue-600 mb-2'>
								{animatedStats.menEmployees.toLocaleString()}
							</div>
							<div className='flex items-center gap-2 mb-2'>
								<div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
									<div
										className='h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out'
										style={{ width: `${animatedStats.menPercentage}%` }}
									></div>
								</div>
								<span className='text-sm font-semibold text-blue-600'>
									{animatedStats.menPercentage}%
								</span>
							</div>
							<div className='text-sm text-gray-600'>
								Jami xodimlarning {animatedStats.menPercentage} foizini tashkil
								etadi
							</div>
						</CardContent>
						<div className='absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500'></div>
					</Card>
				</div>

				{/* Gender Equality Initiatives */}
				<Card className='border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/20 to-white backdrop-blur-sm'>
					<CardHeader>
						<CardTitle className='text-2xl text-[#0E327F] flex items-center gap-2'>
							<Scale className='w-6 h-6' />
							Gender Tenglik Tashabbuslari
						</CardTitle>
						<CardDescription className='text-lg'>
							Ayollar va erkaklar uchun teng imkoniyatlar yaratish bo'yicha
							amalga oshirilayotgan chora-tadbirlar
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
							{initiatives.map((initiative, index) => (
								<div
									key={index}
									className='group p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-50 backdrop-blur-sm'
									style={{ animationDelay: `${index * 0.1}s` }}
								>
									<div
										className={`w-12 h-12 ${initiative.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
									>
										<initiative.icon className='w-6 h-6 text-white' />
									</div>
									<h3 className='font-semibold text-gray-900 mb-2'>
										{initiative.title}
									</h3>
									<p className='text-sm text-gray-600 leading-relaxed'>
										{initiative.description}
									</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Management Statistics */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					<Card className='border-0 shadow-2xl bg-gradient-to-br from-white via-gray-50/50 to-white backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='text-xl text-[#0E327F] flex items-center gap-2'>
								<Building2 className='w-5 h-5' />
								Apparat Tarkibi
							</CardTitle>
							<CardDescription>
								DUK apparatidagi xodimlar tarkibi
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								<div className='flex items-center justify-between p-4 bg-pink-50 rounded-lg'>
									<div className='flex items-center gap-3'>
										<div className='w-3 h-3 bg-pink-500 rounded-full'></div>
										<span className='font-medium'>Ayollar</span>
									</div>
									<div className='text-right'>
										<div className='text-2xl font-bold text-pink-600'>1</div>
										<div className='text-sm text-gray-600'>6.25%</div>
									</div>
								</div>
								<div className='flex items-center justify-between p-4 bg-blue-50 rounded-lg'>
									<div className='flex items-center gap-3'>
										<div className='w-3 h-3 bg-blue-500 rounded-full'></div>
										<span className='font-medium'>Erkaklar</span>
									</div>
									<div className='text-right'>
										<div className='text-2xl font-bold text-blue-600'>15</div>
										<div className='text-sm text-gray-600'>93.75%</div>
									</div>
								</div>
								<div className='pt-2 border-t'>
									<div className='flex items-center justify-between'>
										<span className='font-semibold text-gray-700'>Jami</span>
										<span className='text-xl font-bold text-[#0E327F]'>16</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className='border-0 shadow-2xl bg-gradient-to-br from-white via-gray-50/50 to-white backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='text-xl text-[#0E327F] flex items-center gap-2'>
								<Award className='w-5 h-5' />
								Asosiy Yutuqlar
							</CardTitle>
							<CardDescription>
								Gender tenglik sohasidagi muhim natijalar
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								{achievements.map((achievement, index) => (
									<div
										key={index}
										className='flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100'
									>
										<div className='flex items-center gap-3'>
											<achievement.icon className='w-5 h-5 text-[#0E327F]' />
											<span className='font-medium text-gray-700'>
												{achievement.label}
											</span>
										</div>
										<Badge
											variant='secondary'
											className='bg-green-100 text-green-700 hover:bg-green-200'
										>
											{achievement.value}
										</Badge>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Legal Framework */}
				<Card className='border-0 shadow-2xl bg-white relative overflow-hidden'>
					<CardHeader>
						<CardTitle className='text-2xl flex items-center gap-2 text-[#0E327F]'>
							<Shield className='w-6 h-6' />
							Huquqiy Asos
						</CardTitle>
						<CardDescription className='text-gray-600'>
							Gender tenglikni ta'minlovchi asosiy hujjatlar va qonunlar
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='space-y-3'>
								<h4 className='font-semibold text-lg text-[#0E327F]'>
									Asosiy Qonunlar:
								</h4>
								<ul className='space-y-2 text-gray-600'>
									<li className='flex items-start gap-2'>
										<div className='w-2 h-2 bg-[#0E327F] rounded-full mt-2 flex-shrink-0'></div>
										<span>
											O'RQ-562-sonli "Ayollar va erkaklarning teng huquq va
											imkoniyatlarining kafolatlari to'g'risida"gi Qonun
										</span>
									</li>
									<li className='flex items-start gap-2'>
										<div className='w-2 h-2 bg-[#0E327F] rounded-full mt-2 flex-shrink-0'></div>
										<span>Transport vazirining 2021-yil 69-son buyrug'i</span>
									</li>
									<li className='flex items-start gap-2'>
										<div className='w-2 h-2 bg-[#0E327F] rounded-full mt-2 flex-shrink-0'></div>
										<span>
											Transport vazirining 2023-yil 137-sonli buyrug'i
										</span>
									</li>
								</ul>
							</div>
							<div className='space-y-3'>
								<h4 className='font-semibold text-lg text-[#0E327F]'>
									Tashkiliy Tuzilma:
								</h4>
								<div className='bg-blue-50 backdrop-blur-sm rounded-lg p-4'>
									<h5 className='font-medium mb-2 text-gray-700'>
										Maslahat Kengashi
									</h5>
									<p className='text-sm text-gray-700 leading-relaxed'>
										Ayollar va erkaklar teng huquq va imkoniyatlarini ta'minlash
										masalalari bo'yicha maxsus kengash tashkil etilgan
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
