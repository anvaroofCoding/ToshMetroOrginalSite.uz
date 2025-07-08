'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import {
	ChevronLeft,
	ChevronRight,
	Clock,
	Eye,
	Heart,
	Send,
	User,
	X,
} from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'

const newsData = [
	{
		id: 1,
		title: 'Revolutionary AI Technology Transforms Healthcare Industry',
		description:
			'A groundbreaking artificial intelligence system has been developed that can diagnose diseases with unprecedented accuracy, potentially saving millions of lives worldwide.',
		fullContent:
			'A groundbreaking artificial intelligence system has been developed that can diagnose diseases with unprecedented accuracy, potentially saving millions of lives worldwide. The new technology, developed by a team of researchers at leading medical institutions, uses advanced machine learning algorithms to analyze medical images and patient data. Early trials have shown a 95% accuracy rate in detecting various conditions, including cancer, heart disease, and neurological disorders. The system is expected to be rolled out to hospitals globally within the next two years, marking a significant milestone in medical technology advancement.',
		images: [
			'/placeholder.svg?height=400&width=600',
			'/placeholder.svg?height=400&width=600&text=AI+Diagnosis',
			'/placeholder.svg?height=400&width=600&text=Medical+Technology',
		],
		publishedAt: '2024-01-15T10:30:00Z',
		likes: 1247,
		category: 'Technology',
		comments: [
			{
				id: 1,
				author: 'Dr. Sarah Johnson',
				content:
					'This is truly revolutionary! As a practicing physician, I can see the immense potential this technology has for improving patient outcomes.',
				timestamp: '2024-01-15T12:30:00Z',
			},
			{
				id: 2,
				author: 'Tech Enthusiast',
				content:
					"Amazing breakthrough! Can't wait to see how this develops over the next few years.",
				timestamp: '2024-01-15T14:15:00Z',
			},
		],
	},
	{
		id: 2,
		title: 'Climate Change Summit Reaches Historic Agreement',
		description:
			'World leaders unite in unprecedented climate action plan that promises to reduce global emissions by 50% within the next decade.',
		fullContent:
			'World leaders unite in unprecedented climate action plan that promises to reduce global emissions by 50% within the next decade. The historic agreement, signed by 195 countries, includes binding commitments to transition to renewable energy sources, protect biodiversity, and invest in green technologies. The summit also established a $100 billion fund to help developing nations adapt to climate change impacts. Environmental activists have praised the agreement as a crucial step toward preventing catastrophic global warming, while economists predict significant job creation in the green energy sector.',
		images: [
			'/placeholder.svg?height=400&width=600&text=Climate+Summit',
			'/placeholder.svg?height=400&width=600&text=World+Leaders',
			'/placeholder.svg?height=400&width=600&text=Green+Energy',
		],
		publishedAt: '2024-01-14T14:45:00Z',
		likes: 892,
		category: 'Environment',
		comments: [
			{
				id: 1,
				author: 'Environmental Activist',
				content:
					'Finally! This is the kind of global cooperation we need to address climate change effectively.',
				timestamp: '2024-01-14T16:20:00Z',
			},
		],
	},
	{
		id: 3,
		title: 'Space Exploration Milestone: First Human Colony on Mars',
		description:
			'After years of preparation, the first permanent human settlement on Mars has been successfully established, marking a new era in space exploration.',
		fullContent:
			"After years of preparation, the first permanent human settlement on Mars has been successfully established, marking a new era in space exploration. The colony, consisting of 50 carefully selected astronauts and scientists, has been operational for six months and is thriving in the harsh Martian environment. Advanced life support systems, sustainable food production, and innovative habitat designs have made long-term survival possible. The mission represents humanity's first step toward becoming a multi-planetary species and opens up new possibilities for scientific research and resource utilization.",
		images: [
			'/placeholder.svg?height=400&width=600&text=Mars+Colony',
			'/placeholder.svg?height=400&width=600&text=Space+Habitat',
			'/placeholder.svg?height=400&width=600&text=Mars+Surface',
			'/placeholder.svg?height=400&width=600&text=Astronauts',
		],
		publishedAt: '2024-01-13T09:15:00Z',
		likes: 2156,
		category: 'Space',
		comments: [
			{
				id: 1,
				author: 'Space Engineer',
				content:
					"Incredible achievement! The engineering challenges they've overcome are mind-blowing.",
				timestamp: '2024-01-13T11:30:00Z',
			},
			{
				id: 2,
				author: 'Future Colonist',
				content:
					'I hope to be part of the next wave of Mars colonists. This is just the beginning!',
				timestamp: '2024-01-13T13:45:00Z',
			},
		],
	},
	{
		id: 4,
		title: 'Breakthrough in Quantum Computing Achieved',
		description:
			"Scientists have successfully created the world's most powerful quantum computer, capable of solving complex problems in seconds.",
		fullContent:
			"Scientists have successfully created the world's most powerful quantum computer, capable of solving complex problems in seconds that would take traditional computers thousands of years. The quantum system, featuring 1000 stable qubits, represents a major leap forward in computational power and could revolutionize fields such as cryptography, drug discovery, and financial modeling. The breakthrough was achieved through innovative error correction techniques and advanced quantum gate operations. Industry experts believe this development will accelerate the timeline for practical quantum computing applications by at least a decade.",
		images: [
			'/placeholder.svg?height=400&width=600&text=Quantum+Computer',
			'/placeholder.svg?height=400&width=600&text=Quantum+Circuits',
		],
		publishedAt: '2024-01-12T16:20:00Z',
		likes: 1834,
		category: 'Science',
		comments: [],
	},
	{
		id: 5,
		title: 'Global Economic Recovery Shows Strong Signs',
		description:
			'International markets surge as new economic policies drive unprecedented growth across major economies worldwide.',
		fullContent:
			'International markets surge as new economic policies drive unprecedented growth across major economies worldwide. The coordinated effort by central banks and governments has resulted in a 15% increase in global GDP, with unemployment rates dropping to historic lows. Key sectors including technology, renewable energy, and healthcare are leading the recovery, while innovative fiscal policies have stimulated consumer spending and business investment. Economists are optimistic about sustained growth, though they caution about potential inflationary pressures and the need for continued international cooperation.',
		images: [
			'/placeholder.svg?height=400&width=600&text=Economic+Growth',
			'/placeholder.svg?height=400&width=600&text=Stock+Markets',
		],
		publishedAt: '2024-01-11T11:00:00Z',
		likes: 967,
		category: 'Business',
		comments: [
			{
				id: 1,
				author: 'Economic Analyst',
				content:
					'The recovery has been faster than most economists predicted. Great news for global markets!',
				timestamp: '2024-01-11T13:15:00Z',
			},
		],
	},
	{
		id: 6,
		title: 'Medical Breakthrough: Gene Therapy Cures Rare Disease',
		description:
			'A revolutionary gene therapy treatment has successfully cured patients with a previously incurable genetic disorder.',
		fullContent:
			"A revolutionary gene therapy treatment has successfully cured patients with a previously incurable genetic disorder, offering hope to millions of families worldwide. The treatment, which involves modifying patients' DNA to correct genetic defects, has shown 100% success rate in clinical trials involving 200 patients. The therapy uses advanced CRISPR technology to precisely edit genes responsible for the rare disease, effectively reversing the condition at its source. Medical professionals are calling it one of the most significant advances in genetic medicine, with potential applications for treating hundreds of other genetic disorders.",
		images: [
			'/placeholder.svg?height=400&width=600&text=Gene+Therapy',
			'/placeholder.svg?height=400&width=600&text=CRISPR+Technology',
			'/placeholder.svg?height=400&width=600&text=Medical+Research',
		],
		publishedAt: '2024-01-10T13:30:00Z',
		likes: 3245,
		category: 'Health',
		comments: [
			{
				id: 1,
				author: 'Medical Researcher',
				content:
					'This breakthrough will change the lives of so many patients and families. Incredible work!',
				timestamp: '2024-01-10T15:45:00Z',
			},
		],
	},
	{
		id: 10,
		title: 'Revolutionary AI Technology Transforms Healthcare Industry',
		description:
			'A groundbreaking artificial intelligence system has been developed that can diagnose diseases with unprecedented accuracy, potentially saving millions of lives worldwide.',
		fullContent:
			'A groundbreaking artificial intelligence system has been developed that can diagnose diseases with unprecedented accuracy, potentially saving millions of lives worldwide. The new technology, developed by a team of researchers at leading medical institutions, uses advanced machine learning algorithms to analyze medical images and patient data. Early trials have shown a 95% accuracy rate in detecting various conditions, including cancer, heart disease, and neurological disorders. The system is expected to be rolled out to hospitals globally within the next two years, marking a significant milestone in medical technology advancement.',
		images: [
			'/placeholder.svg?height=400&width=600',
			'/placeholder.svg?height=400&width=600&text=AI+Diagnosis',
			'/placeholder.svg?height=400&width=600&text=Medical+Technology',
		],
		publishedAt: '2024-01-15T10:30:00Z',
		likes: 1247,
		category: 'Technology',
		comments: [
			{
				id: 1,
				author: 'Dr. Sarah Johnson',
				content:
					'This is truly revolutionary! As a practicing physician, I can see the immense potential this technology has for improving patient outcomes.',
				timestamp: '2024-01-15T12:30:00Z',
			},
			{
				id: 2,
				author: 'Tech Enthusiast',
				content:
					"Amazing breakthrough! Can't wait to see how this develops over the next few years.",
				timestamp: '2024-01-15T14:15:00Z',
			},
		],
	},
]

const ITEMS_PER_PAGE = 6

export default function NewsSection() {
	const [selectedNews, setSelectedNews] = useState(null)
	const [likedItems, setLikedItems] = useState(new Set())
	const [currentPage, setCurrentPage] = useState(1)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [comments, setComments] = useState({})
	const [commentForm, setCommentForm] = useState({
		name: '',
		email: '',
		comment: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [notification, setNotification] = useState(null)

	const totalPages = Math.ceil(newsData.length / ITEMS_PER_PAGE)

	const currentNews = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		return newsData.slice(startIndex, startIndex + ITEMS_PER_PAGE)
	}, [currentPage])

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

	const goToPage = page => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleModalOpen = news => {
		setSelectedNews(news)
		setCurrentImageIndex(0)
		// Initialize comments for this news item if not already present
		if (!comments[news.id]) {
			setComments(prev => ({
				...prev,
				[news.id]: [...news.comments],
			}))
		}
	}

	const handleModalClose = () => {
		setSelectedNews(null)
		setCurrentImageIndex(0)
		setCommentForm({ name: '', email: '', comment: '' })
	}

	const nextImage = () => {
		if (selectedNews && selectedNews.images) {
			setCurrentImageIndex(prev => (prev + 1) % selectedNews.images.length)
		}
	}

	const prevImage = () => {
		if (selectedNews && selectedNews.images) {
			setCurrentImageIndex(
				prev =>
					(prev - 1 + selectedNews.images.length) % selectedNews.images.length
			)
		}
	}

	const handleCommentSubmit = async e => {
		e.preventDefault()
		if (
			!commentForm.name.trim() ||
			!commentForm.email.trim() ||
			!commentForm.comment.trim()
		) {
			showNotification('Please fill in all fields', 'error')
			return
		}

		setIsSubmitting(true)

		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1000))

		const newComment = {
			id: Date.now(),
			author: commentForm.name,
			content: commentForm.comment,
			timestamp: new Date().toISOString(),
		}

		setComments(prev => ({
			...prev,
			[selectedNews.id]: [...(prev[selectedNews.id] || []), newComment],
		}))

		setCommentForm({ name: '', email: '', comment: '' })
		setIsSubmitting(false)
		showNotification('Comment submitted successfully!', 'success')
	}

	const showNotification = (message, type) => {
		setNotification({ message, type })
		setTimeout(() => setNotification(null), 3000)
	}

	const handleInputChange = (field, value) => {
		setCommentForm(prev => ({ ...prev, [field]: value }))
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4'>
			<div className='container mx-auto'>
				{/* Header */}
				<div className='text-start mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#0E327F] to-blue-600 bg-clip-text text-transparent'>
						Metropoliten yangiliklari
					</h1>
					<p className='text-gray-600 text-lg'>
						Eng so'nggi yangiliklar va o'zgarishlardan xabardor bo'ling
					</p>
				</div>

				{/* News Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
					{currentNews.map((news, index) => (
						<Card
							key={news.id}
							className='group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 shadow-lg overflow-hidden'
							onClick={() => handleModalOpen(news)}
						>
							<div className='relative overflow-hidden'>
								<Image
									src={news.images?.[0] || '/placeholder.svg'}
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
								{news.images && news.images.length > 1 && (
									<div className='absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full'>
										+{news.images.length - 1} more
									</div>
								)}
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
											{news.likes + (likedItems.has(news.id) ? 1 : 0)}
										</span>
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Pagination */}
				<div className='flex items-center justify-center gap-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => goToPage(currentPage - 1)}
						disabled={currentPage === 1}
						className='flex items-center gap-1'
					>
						<ChevronLeft className='w-4 h-4' />
						Previous
					</Button>

					<div className='flex items-center gap-1'>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
							<Button
								key={page}
								variant={currentPage === page ? 'default' : 'outline'}
								size='sm'
								onClick={() => goToPage(page)}
								className={`w-10 h-10 ${
									currentPage === page
										? 'bg-[#0E327F] hover:bg-[#0E327F]/90 text-white'
										: 'hover:bg-gray-100'
								}`}
							>
								{page}
							</Button>
						))}
					</div>

					<Button
						variant='outline'
						size='sm'
						onClick={() => goToPage(currentPage + 1)}
						disabled={currentPage === totalPages}
						className='flex items-center gap-1'
					>
						Next
						<ChevronRight className='w-4 h-4' />
					</Button>
				</div>

				{/* Modal */}
				{selectedNews && (
					<div className='fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-50'>
						<div className='bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto'>
							<div className='relative'>
								{/* Image Gallery */}
								<div className='relative h-64 md:h-80'>
									<Image
										src={
											selectedNews.images?.[currentImageIndex] ||
											'/placeholder.svg'
										}
										alt={selectedNews.title}
										width={800}
										height={400}
										className='w-full h-full object-cover'
									/>
									<div className='absolute inset-0 bg-[#0E327F] bg-opacity-30' />

									{/* Image Navigation */}
									{selectedNews.images && selectedNews.images.length > 1 && (
										<>
											<Button
												variant='ghost'
												size='sm'
												className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full p-2'
												onClick={prevImage}
											>
												<ChevronLeft className='w-5 h-5' />
											</Button>
											<Button
												variant='ghost'
												size='sm'
												className='absolute right-16 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full p-2'
												onClick={nextImage}
											>
												<ChevronRight className='w-5 h-5' />
											</Button>

											{/* Image Counter */}
											<div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full'>
												{currentImageIndex + 1} / {selectedNews.images.length}
											</div>
										</>
									)}

									<Button
										variant='ghost'
										size='sm'
										className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full p-2'
										onClick={handleModalClose}
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

								{/* Image Thumbnails */}
								{selectedNews.images && selectedNews.images.length > 1 && (
									<div className='flex gap-2 p-4 overflow-x-auto'>
										{selectedNews.images.map((image, index) => (
											<button
												key={index}
												onClick={() => setCurrentImageIndex(index)}
												className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
													currentImageIndex === index
														? 'border-[#0E327F]'
														: 'border-gray-200'
												}`}
											>
												<Image
													src={image || '/placeholder.svg'}
													alt={`${selectedNews.title} ${index + 1}`}
													width={64}
													height={64}
													className='w-full h-full object-cover'
												/>
											</button>
										))}
									</div>
								)}
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

								<div className='flex items-center justify-between pt-6 border-t border-gray-200 mb-8'>
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
											{selectedNews.likes +
												(likedItems.has(selectedNews.id) ? 1 : 0)}{' '}
											Likes
										</span>
									</Button>
								</div>

								{/* Comments Section */}
								<div className='border-t border-gray-200 pt-8'>
									<h3 className='text-xl font-bold mb-6 text-gray-900'>
										Comments ({comments[selectedNews.id]?.length || 0})
									</h3>

									{/* Existing Comments */}
									<div className='space-y-4 mb-8'>
										{(comments[selectedNews.id] || []).map(comment => (
											<div
												key={comment.id}
												className='bg-gray-50 rounded-lg p-4'
											>
												<div className='flex items-center gap-2 mb-2'>
													<div className='w-8 h-8 bg-[#0E327F] rounded-full flex items-center justify-center'>
														<User className='w-4 h-4 text-white' />
													</div>
													<div>
														<p className='font-semibold text-gray-900'>
															{comment.author}
														</p>
														<p className='text-xs text-gray-500'>
															{formatTimeAgo(comment.timestamp)}
														</p>
													</div>
												</div>
												<p className='text-gray-700 ml-10'>{comment.content}</p>
											</div>
										))}
									</div>

									{/* Comment Form */}
									<div className='bg-gray-50 rounded-lg p-6'>
										<h4 className='text-lg font-semibold mb-4 text-gray-900'>
											Leave a Comment
										</h4>
										<form onSubmit={handleCommentSubmit} className='space-y-4'>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												<div>
													<label
														htmlFor='name'
														className='block text-sm font-medium text-gray-700 mb-1'
													>
														Name *
													</label>
													<Input
														id='name'
														type='text'
														value={commentForm.name}
														onChange={e =>
															handleInputChange('name', e.target.value)
														}
														placeholder='Your name'
														required
													/>
												</div>
												<div>
													<label
														htmlFor='email'
														className='block text-sm font-medium text-gray-700 mb-1'
													>
														Email *
													</label>
													<Input
														id='email'
														type='email'
														value={commentForm.email}
														onChange={e =>
															handleInputChange('email', e.target.value)
														}
														placeholder='your@email.com'
														required
													/>
												</div>
											</div>
											<div>
												<label
													htmlFor='comment'
													className='block text-sm font-medium text-gray-700 mb-1'
												>
													Comment *
												</label>
												<Textarea
													id='comment'
													value={commentForm.comment}
													onChange={e =>
														handleInputChange('comment', e.target.value)
													}
													placeholder='Share your thoughts...'
													rows={4}
													required
												/>
											</div>
											<Button
												type='submit'
												disabled={isSubmitting}
												className='bg-[#0E327F] hover:bg-[#0E327F]/90 text-white flex items-center gap-2'
											>
												<Send className='w-4 h-4' />
												{isSubmitting ? 'Submitting...' : 'Submit Comment'}
											</Button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Notification */}
				{notification && (
					<div className='fixed top-4 right-4 z-50 animate-slide-in'>
						<div
							className={`px-6 py-3 rounded-lg shadow-lg text-white ${
								notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
							}`}
						>
							{notification.message}
						</div>
					</div>
				)}
			</div>

			<style jsx global>{`
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
				@keyframes slide-in {
					from {
						opacity: 0;
						transform: translateX(100%);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}
				.animate-slide-in {
					animation: slide-in 0.3s ease-out;
				}
			`}</style>
		</div>
	)
}
