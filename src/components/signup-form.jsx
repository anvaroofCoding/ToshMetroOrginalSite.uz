'use client'

import {
	authCardClass,
	authInputClass,
	authOutlineBtnClass,
	authPrimaryBtnClass,
	authTitleClass,
} from '@/components/auth/auth-styles'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
	formatUzPhoneE164,
	isValidUzPhone,
	UzPhoneInput,
} from '@/components/uz-phone-input'
import { Link } from '@/i18n/navigation'
import { usePostRegisterMutation } from '@/store/services/api'
import { Loader2, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'
import { OTPForm } from './otp-form'

export function SignupForm({ ...props }) {
	const t = useTranslations('menu')
	const [show, setShow] = useState(false)
	const [postRegister, { isLoading }] = usePostRegisterMutation()
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		phone: '',
		is_verified: false,
	})
	const [phoneDigits, setPhoneDigits] = useState('')

	function handleChange(e) {
		const { name, value, type, checked } = e.target
		setFormData(prevState => ({
			...prevState,
			[name]: type === 'checkbox' ? checked : value,
		}))
	}

	function handlePhoneChange(digits) {
		setPhoneDigits(digits)
		setFormData(prev => ({
			...prev,
			phone: digits ? formatUzPhoneE164(digits) : '',
		}))
	}

	async function Submit() {
		if (!isValidUzPhone(phoneDigits)) {
			toast.error(t('phoneError'))
			return
		}

		try {
			await postRegister({
				...formData,
				phone: formatUzPhoneE164(phoneDigits),
			}).unwrap()
			toast.success("Parol muvaffaqiyatli Jo'natildi!")
			setShow(true)
		} catch (error) {
			if (error?.data?.error) {
				toast.error(error?.data?.error)
			}
		}
	}

	if (show) {
		return <OTPForm formData={formData} shows={show} />
	}

	return (
		<Card className={authCardClass} {...props}>
			<CardHeader className='gap-2 px-5 pb-0 sm:px-6'>
				<CardTitle className={authTitleClass}>{t('createAccount')}</CardTitle>
			</CardHeader>
			<CardContent className='px-5 sm:px-6'>
				<form onSubmit={e => e.preventDefault()}>
					<FieldGroup className='gap-4'>
						<Field>
							<FieldLabel
								htmlFor='first_name'
								className='text-sm font-medium text-blue-900'
							>
								{t('firstName')}
							</FieldLabel>
							<Input
								id='first_name'
								name='first_name'
								value={formData.first_name}
								onChange={handleChange}
								placeholder={t('firstNamePlaceholder')}
								className={authInputClass}
								required
							/>
						</Field>
						<Field>
							<FieldLabel
								htmlFor='last_name'
								className='text-sm font-medium text-blue-900'
							>
								{t('lastName')}
							</FieldLabel>
							<Input
								id='last_name'
								name='last_name'
								value={formData.last_name}
								onChange={handleChange}
								placeholder={t('lastNamePlaceholder')}
								className={authInputClass}
							/>
						</Field>
						<Field>
							<FieldLabel
								htmlFor='phone'
								className='text-sm font-medium text-blue-900'
							>
								{t('phone')}
							</FieldLabel>
							<UzPhoneInput
								id='phone'
								value={phoneDigits}
								onChange={handlePhoneChange}
							/>
						</Field>
						<div className='flex flex-col gap-2.5 pt-1'>
							<Button
								type='button'
								onClick={Submit}
								disabled={isLoading}
								className={authPrimaryBtnClass}
							>
								{t('sendCode')}
								{isLoading ? (
									<Loader2 className='h-4 w-4 animate-spin' />
								) : (
									<Send className='h-4 w-4' />
								)}
							</Button>
							<Button
								variant='outline'
								asChild
								className={authOutlineBtnClass}
							>
								<Link href='/kirish'>{t('login')}</Link>
							</Button>
						</div>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	)
}
