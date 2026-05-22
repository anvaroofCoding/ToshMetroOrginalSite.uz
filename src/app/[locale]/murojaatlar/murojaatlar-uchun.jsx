'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
	useLostItemsMeQuery,
	usePostMurojaatMutation,
} from '@/store/services/api'
import { CheckCircle, Loader, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

const PASSPORT_SERIES = Array.from({ length: 26 }, (_, i) =>
	Array.from({ length: 26 }, (_, j) =>
		String.fromCharCode(65 + i) + String.fromCharCode(65 + j),
	),
).flat()

const fieldClassName =
	'h-9 min-h-9 rounded-md border border-blue-200 bg-white px-3 py-1 text-base text-gray-900 shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'

const inputClassName = `${fieldClassName} w-full placeholder:text-gray-400`

export default function MetroLostItemForm() {
	const { data, isLoading: loadsn, refetch } = useLostItemsMeQuery()
	const t = useTranslations('menu')
	const [formData, setFormData] = useState({
		email: '',
		passportSeries: 'AD',
		passportNumber: '',
		address: '',
		message: '',
	})
	const [postLostITems, { isLoading }] = usePostMurojaatMutation()

	const handlePassportNumberChange = e => {
		const digits = e.target.value.replace(/\D/g, '').slice(0, 7)
		setFormData(prev => ({ ...prev, passportNumber: digits }))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if (formData.passportNumber.length !== 7) {
			toast.error(t('passport_number_invalid'))
			return
		}

		try {
			const finalData = {
				email: formData.email,
				passport: `${formData.passportSeries}${formData.passportNumber}`,
				address: formData.address,
				message: formData.message,
				status: 'pending',
			}
			await postLostITems(finalData).unwrap()
			toast.success(t('success_received'))
			refetch()
		} catch (error) {
			if (error?.data?.phone) toast.error(error?.data.phone[0])
			if (error?.data?.message) toast.error(t('comment_required'))
			if (error?.data?.passport) toast.error(t('passport_required'))
		}
	}

	if (loadsn) {
		return (
			<div className='w-full h-screen justify-center flex items-center'>
				<p>{t('two_hundred_thirteen')}</p>
			</div>
		)
	}

	// Faqat avval murojaat yuborilgan va yangi yuborish taqiqlanganda success ko'rsatiladi
	const latestRequest = data?.requests?.[0]
	const hasPendingRequest = latestRequest?.can_send_new_request === false

	if (!hasPendingRequest) {
		return (
			<Card className='container bg-white shadow-md border border-blue-100'>
				<CardHeader>
					<CardTitle className='text-blue-900'>{t('send_request')}</CardTitle>
					<CardDescription className='text-gray-600 leading-relaxed'>
						{t.rich('form_warning', {
							link: chunks => (
								<a
									href='https://murojaat.gov.uz'
									target='_blank'
									rel='noopener noreferrer'
									className='font-medium text-blue-700 underline hover:text-blue-900'
								>
									{chunks}
								</a>
							),
						})}
					</CardDescription>
				</CardHeader>
				<CardContent className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					<div className='flex flex-col gap-6'>
						<div className='grid gap-2'>
							<Label htmlFor='email' className='text-blue-900'>
								{t('one_hundred_eighty_six')}
							</Label>
							<Input
								id='email'
								type='email'
								placeholder='m@example.com'
								required
								value={formData.email}
								onChange={e =>
									setFormData({ ...formData, email: e.target.value })
								}
								className={inputClassName}
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='passport-number' className='text-blue-900'>
								{t('passport_label')}
							</Label>
							<div className='flex items-center gap-2'>
								<Select
									value={formData.passportSeries}
									onValueChange={value =>
										setFormData(prev => ({ ...prev, passportSeries: value }))
									}
								>
									<SelectTrigger
										id='passport-series'
										className={cn(
											fieldClassName,
											'w-[92px] shrink-0 ring-offset-0 focus:ring-offset-0',
										)}
										aria-label={t('passport_series_label')}
									>
										<SelectValue />
									</SelectTrigger>
									<SelectContent className='max-h-60 bg-white'>
										{PASSPORT_SERIES.map(series => (
											<SelectItem key={series} value={series}>
												{series}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<Input
									id='passport-number'
									type='text'
									inputMode='numeric'
									placeholder='1234567'
									required
									minLength={7}
									maxLength={7}
									pattern='\d{7}'
									value={formData.passportNumber}
									onChange={handlePassportNumberChange}
									className={`min-h-9 flex-1 ${inputClassName}`}
								/>
							</div>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='address' className='text-blue-900'>
								{t('address_labels')}
							</Label>
							<Input
								id='address'
								type='text'
								placeholder={t('address_placeholder')}
								required
								value={formData.address}
								onChange={e =>
									setFormData({ ...formData, address: e.target.value })
								}
								className={inputClassName}
							/>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<Label htmlFor='discription' className='text-blue-900'>
							{t('message_label')}
						</Label>
						<Textarea
							id='discription'
							placeholder={t('message_placeholder')}
							required
							className={cn(inputClassName, 'h-[180px] min-h-[180px] resize-y')}
							value={formData.message}
							onChange={e =>
								setFormData({ ...formData, message: e.target.value })
							}
						/>
					</div>
				</CardContent>
				<CardFooter className='text-center'>
					{isLoading ? (
						<Button
							type='button'
							disabled={isLoading}
							className='w-full bg-blue-900 hover:bg-blue-800 duration-300'
						>
							{t('sending_button')}{' '}
							<Loader className='ml-2 spin-animate' size={15} />
						</Button>
					) : (
						<Button
							type='button'
							className='w-full bg-blue-900 hover:bg-blue-800 duration-300'
							onClick={handleSubmit}
						>
							{t('send_button')} <Send className='ml-2' size={15} />
						</Button>
					)}
				</CardFooter>
			</Card>
		)
	} else {
		return (
			<Card className='max-w-lg mx-auto mt-10 p-6 bg-white/50 rounded-2xl shadow-lg border animate-fadeIn'>
				<CardHeader className='text-center'>
					{/* Success icon */}
					<div className='flex justify-center mb-4'>
						<CheckCircle className='text-green-500 w-16 h-16' />
					</div>

					<CardTitle className='text-2xl font-bold text-green-700'>
						{t('success_title')}
					</CardTitle>
					<CardDescription className='mt-2 text-gray-600'>
						{t('success_description', {
							date: latestRequest?.deadline ?? '—',
						})}
					</CardDescription>
				</CardHeader>

				<CardContent className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
					<div className='col-span-1 lg:col-span-2 text-center'>
						<p className='text-green-600 font-medium'>{t('thanks_message')}</p>
					</div>
				</CardContent>
			</Card>
		)
	}
}
