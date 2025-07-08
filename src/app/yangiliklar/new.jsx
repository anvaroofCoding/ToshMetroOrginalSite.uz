'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Eye, Heart, MessageCircle, Share2, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const newsData = [
	{
		id: 1,
		title: 'Revolutionary AI Technology Transforms Healthcare Industry',
		description:
			'A groundbreaking artificial intelligence system has been developed that can diagnose diseases with unprecedented accuracy, potentially saving millions of lives worldwide.',
		fullContent:
			'A groundbreaking artificial intelligence system has been developed that can diagnose diseases with unprecedented accuracy, potentially saving millions of lives worldwide. The new technology, developed by a team of researchers at leading medical institutions, uses advanced machine learning algorithms to analyze medical images and patient data. Early trials have shown a 95% accuracy rate in detecting various conditions, including cancer, heart disease, and neurological disorders. The system is expected to be rolled out to hospitals globally within the next two years, marking a significant milestone in medical technology advancement.',
		image: '/placeholder.svg?height=200&width=300',
		publishedAt: '2024-01-15T10:30:00Z',
		reactions: { likes: 1247, comments: 89, shares: 156 },
		category: 'Technology',
	},
	{
		id: 2,
		title: 'Climate Change Summit Reaches Historic Agreement',
		description:
			'World leaders unite in unprecedented climate action plan that promises to reduce global emissions by 50% within the next decade.',
		fullContent:
			'World leaders unite in unprecedented climate action plan that promises to reduce global emissions by 50% within the next decade. The historic agreement, signed by 195 countries, includes binding commitments to transition to renewable energy sources, protect biodiversity, and invest in green technologies. The summit also established a $100 billion fund to help developing nations adapt to climate change impacts. Environmental activists have praised the agreement as a crucial step toward preventing catastrophic global warming, while economists predict significant job creation in the green energy sector.',
		image: '/placeholder.svg?height=200&width=300',
		publishedAt: '2024-01-14T14:45:00Z',
		reactions: { likes: 892, comments: 234, shares: 445 },
		category: 'Environment',
	},
	{
		id: 3,
		title: 'Space Exploration Milestone: First Human Colony on Mars',
		description:
			'After years of preparation, the first permanent human settlement on Mars has been successfully established, marking a new era in space exploration.',
		fullContent:
			"After years of preparation, the first permanent human settlement on Mars has been successfully established, marking a new era in space exploration. The colony, consisting of 50 carefully selected astronauts and scientists, has been operational for six months and is thriving in the harsh Martian environment. Advanced life support systems, sustainable food production, and innovative habitat designs have made long-term survival possible. The mission represents humanity's first step toward becoming a multi-planetary species and opens up new possibilities for scientific research and resource utilization.",
		image: '/placeholder.svg?height=200&width=300',
		publishedAt: '2024-01-13T09:15:00Z',
		reactions: { likes: 2156, comments: 567, shares: 789 },
		category: 'Space',
	},
	{
		id: 4,
		title: 'Breakthrough in Quantum Computing Achieved',
		description:
			"Scientists have successfully created the world's most powerful quantum computer, capable of solving complex problems in seconds.",
		fullContent:
			"Scientists have successfully created the world's most powerful quantum computer, capable of solving complex problems in seconds that would take traditional computers thousands of years. The quantum system, featuring 1000 stable qubits, represents a major leap forward in computational power and could revolutionize fields such as cryptography, drug discovery, and financial modeling. The breakthrough was achieved through innovative error correction techniques and advanced quantum gate operations. Industry experts believe this development will accelerate the timeline for practical quantum computing applications by at least a decade.",
		image: '/placeholder.svg?height=200&width=300',
		publishedAt: '2024-01-12T16:20:00Z',
		reactions: { likes: 1834, comments: 298, shares: 412 },
		category: 'Science',
	},
	{
		id: 5,
		title: 'Global Economic Recovery Shows Strong Signs',
		description:
			'International markets surge as new economic policies drive unprecedented growth across major economies worldwide.',
		fullContent:
			'International markets surge as new economic policies drive unprecedented growth across major economies worldwide. The coordinated effort by central banks and governments has resulted in a 15% increase in global GDP, with unemployment rates dropping to historic lows. Key sectors including technology, renewable energy, and healthcare are leading the recovery, while innovative fiscal policies have stimulated consumer spending and business investment. Economists are optimistic about sustained growth, though they caution about potential inflationary pressures and the need for continued international cooperation.',
		image: '/placeholder.svg?height=200&width=300',
		publishedAt: '2024-01-11T11:00:00Z',
		reactions: { likes: 967, comments: 145, shares: 223 },
		category: 'Business',
	},
	{
		id: 6,
		title: 'Medical Breakthrough: Gene Therapy Cures Rare Disease',
		description:
			'A revolutionary gene therapy treatment has successfully cured patients with a previously incurable genetic disorder.',
		fullContent:
			"A revolutionary gene therapy treatment has successfully cured patients with a previously incurable genetic disorder, offering hope to millions of families worldwide. The treatment, which involves modifying patients' DNA to correct genetic defects, has shown 100% success rate in clinical trials involving 200 patients. The therapy uses advanced CRISPR technology to precisely edit genes responsible for the rare disease, effectively reversing the condition at its source. Medical professionals are calling it one of the most significant advances in genetic medicine, with potential applications for treating hundreds of other genetic disorders.",
		image: '/placeholder.svg?height=200&width=300',
		publishedAt: '2024-01-10T13:30:00Z',
		reactions: { likes: 3245, comments: 678, shares: 891 },
		category: 'Health',
	},
]

export default function NewsSection() {
	const [selectedNews, setSelectedNews] = useState(null)
	const [likedItems, setLikedItems] = useState(new Set())

	const formatTimeAgo = dateString => {
		const now = new Date()
		const published = new Date(dateString)
		const diffInHours = Math.floor(
			(now.getTime() - published.getTime()) / (1000 * 60 * 60)
		)

		if (diffInHours < 1) return 'Just now'
		if (diffInHours < 24) return `${diffInHours}h ago`
		const diffInDays = Math.floor(diffInHours / 24)
		if (diffInDays < 7) return `${diffInDays}d ago`
		return `${Math.floor(diffInDays / 7)}w ago`
	}

	const handleLike = (newsId, e) => {
		e.stopPropagation()
		setLikedItems(prev => {
			const newSet = new Set(prev)
			if (newSet.has(newsId)) {
				newSet.delete(newsId)
			} else {
				newSet.add(newsId)
			}
			return newSet
		})
	}

	const getCategoryColor = category => {
		const colors = {
			Technology: 'bg-blue-100 text-blue-800',
			Environment: 'bg-green-100 text-green-800',
			Space: 'bg-purple-100 text-purple-800',
			Science: 'bg-indigo-100 text-indigo-800',
			Business: 'bg-orange-100 text-orange-800',
			Health: 'bg-red-100 text-red-800',
		}
		return colors[category] || 'bg-gray-100 text-gray-800'
	}

	return (
		<div className='min-h-screen container bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='text-start mb-12 animate-fade-in'>
					<h1 className='text-4xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#0E327F] to-blue-600 bg-clip-text text-transparent'>
						Metropoliten yangiliklari
					</h1>
				</div>

				{/* News Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{newsData.map((news, index) => (
						<Card
							key={news.id}
							className='group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 shadow-lg overflow-hidden animate-slide-up'
							style={{ animationDelay: `${index * 100}ms` }}
							onClick={() => setSelectedNews(news)}
						>
							<div className='relative overflow-hidden'>
								<Image
									src={news.image || '/placeholder.svg'}
									alt={news.title}
									width={300}
									height={200}
									className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110'
								/>
								<div className='absolute inset-0 bg-[#0E327F] bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30' />
								<Badge
									className={`absolute top-3 left-3 ${getCategoryColor(
										news.category
									)} border-0`}
								>
									{news.category}
								</Badge>
								<div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
									<Eye className='w-4 h-4 text-[#0E327F]' />
								</div>
							</div>

							<CardContent className='p-6'>
								<div className='flex items-center gap-2 text-sm text-gray-500 mb-3'>
									<Clock className='w-4 h-4' />
									<span>{formatTimeAgo(news.publishedAt)}</span>
								</div>

								<h3 className='font-bold text-lg mb-3 text-gray-900 group-hover:text-[#0E327F] transition-colors duration-300 line-clamp-2'>
									{news.title}
								</h3>

								<p className='text-gray-600 text-sm mb-4 line-clamp-3'>
									{news.description}
								</p>

								<div className='flex items-center justify-between pt-4 border-t border-gray-100'>
									<div className='flex items-center gap-4'>
										<Button
											variant='ghost'
											size='sm'
											className={`flex items-center gap-1 transition-all duration-200 hover:scale-110 ${
												likedItems.has(news.id)
													? 'text-red-500'
													: 'text-gray-500 hover:text-red-500'
											}`}
											onClick={e => handleLike(news.id, e)}
										>
											<Heart
												className={`w-4 h-4 ${
													likedItems.has(news.id) ? 'fill-current' : ''
												}`}
											/>
											<span className='text-xs'>
												{news.reactions.likes +
													(likedItems.has(news.id) ? 1 : 0)}
											</span>
										</Button>

										<Button
											variant='ghost'
											size='sm'
											className='flex items-center gap-1 text-gray-500 hover:text-[#0E327F] transition-all duration-200 hover:scale-110'
										>
											<MessageCircle className='w-4 h-4' />
											<span className='text-xs'>{news.reactions.comments}</span>
										</Button>

										<Button
											variant='ghost'
											size='sm'
											className='flex items-center gap-1 text-gray-500 hover:text-[#0E327F] transition-all duration-200 hover:scale-110'
										>
											<Share2 className='w-4 h-4' />
											<span className='text-xs'>{news.reactions.shares}</span>
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Modal */}
				{selectedNews && (
					<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in'>
						<div className='bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in'>
							<div className='relative'>
								<Image
									src={selectedNews.image || '/placeholder.svg'}
									alt={selectedNews.title}
									width={800}
									height={400}
									className='w-full h-64 md:h-80 object-cover'
								/>
								<div className='absolute inset-0 bg-[#0E327F] bg-opacity-30' />
								<Button
									variant='ghost'
									size='sm'
									className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full p-2'
									onClick={() => setSelectedNews(null)}
								>
									<X className='w-5 h-5' />
								</Button>
								<Badge
									className={`absolute bottom-4 left-4 ${getCategoryColor(
										selectedNews.category
									)} border-0`}
								>
									{selectedNews.category}
								</Badge>
							</div>

							<div className='p-6 md:p-8'>
								<div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
									<Clock className='w-4 h-4' />
									<span>{formatTimeAgo(selectedNews.publishedAt)}</span>
								</div>

								<h2 className='text-2xl md:text-3xl font-bold mb-6 text-gray-900'>
									{selectedNews.title}
								</h2>

								<div className='prose max-w-none mb-8'>
									<p className='text-gray-700 leading-relaxed text-lg'>
										{selectedNews.fullContent}
									</p>
								</div>

								<div className='flex items-center justify-between pt-6 border-t border-gray-200'>
									<div className='flex items-center gap-6'>
										<Button
											variant='ghost'
											className={`flex items-center gap-2 transition-all duration-200 hover:scale-110 ${
												likedItems.has(selectedNews.id)
													? 'text-red-500'
													: 'text-gray-500 hover:text-red-500'
											}`}
											onClick={e => handleLike(selectedNews.id, e)}
										>
											<Heart
												className={`w-5 h-5 ${
													likedItems.has(selectedNews.id) ? 'fill-current' : ''
												}`}
											/>
											<span>
												{selectedNews.reactions.likes +
													(likedItems.has(selectedNews.id) ? 1 : 0)}{' '}
												Likes
											</span>
										</Button>

										<Button
											variant='ghost'
											className='flex items-center gap-2 text-gray-500 hover:text-[#0E327F] transition-all duration-200 hover:scale-110'
										>
											<MessageCircle className='w-5 h-5' />
											<span>{selectedNews.reactions.comments} Comments</span>
										</Button>

										<Button
											variant='ghost'
											className='flex items-center gap-2 text-gray-500 hover:text-[#0E327F] transition-all duration-200 hover:scale-110'
										>
											<Share2 className='w-5 h-5' />
											<span>{selectedNews.reactions.shares} Shares</span>
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			<style jsx global>{`
				@keyframes fade-in {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}

				@keyframes slide-up {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes scale-in {
					from {
						opacity: 0;
						transform: scale(0.9);
					}
					to {
						opacity: 1;
						transform: scale(1);
					}
				}

				.animate-fade-in {
					animation: fade-in 0.6s ease-out;
				}

				.animate-slide-up {
					animation: slide-up 0.6s ease-out both;
				}

				.animate-scale-in {
					animation: scale-in 0.3s ease-out;
				}

				.line-clamp-2 {
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.line-clamp-3 {
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			`}</style>
		</div>
	)
}
