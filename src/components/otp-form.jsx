'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
	authCardClass,
	authOtpGroupClass,
} from '@/components/auth/auth-styles'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from '@/components/ui/card'
import { FieldDescription, FieldGroup } from '@/components/ui/field'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { formatUzPhoneDisplay } from '@/components/uz-phone-input'
import {
	usePostRegisterMutation,
	useRegisterOtpMutation,
} from '@/store/services/api'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const OTP_LENGTH = 6

function formatPhoneForDisplay(phone) {
	if (!phone) return ''
	const digits = phone.replace(/\D/g, '').replace(/^998/, '')
	return `+998 ${formatUzPhoneDisplay(digits)}`
}

export function OTPForm({ formData, shows, ...props }) {
	const t = useTranslations('menu')
	const router = useRouter()
	const [senOtp, { isLoading }] = useRegisterOtpMutation()
	const [postRegister, { isLoading: resending }] = usePostRegisterMutation()
	const [seconds, setSeconds] = useState(60)
	const [otp, setOtp] = useState('')
	const [show, setShow] = useState(shows)
	const verifyingRef = useRef(false)

	const phoneDisplay = formatPhoneForDisplay(formData?.phone)

	const submitOtp = useCallback(
		async code => {
			if (verifyingRef.current || code.length !== OTP_LENGTH) return

			verifyingRef.current = true
			try {
				const response = await senOtp({ code }).unwrap()
				toast.success(response.message)
				localStorage.setItem('token', response.access)
				router.push('/')
			} catch (error) {
				setOtp('')
				if (error?.data?.error) {
					toast.error(error?.data?.error)
				}
			} finally {
				verifyingRef.current = false
			}
		},
		[senOtp, router],
	)

	async function resendCode() {
		if (seconds > 0 || resending) return

		try {
			await postRegister(formData).unwrap()
			toast.success("Parol muvaffaqiyatli Jo'natildi!")
			setOtp('')
			setShow(true)
			setSeconds(60)
		} catch (error) {
			if (error?.data?.error) {
				toast.error(error?.data?.error)
			}
		}
	}

	useEffect(() => {
		if (!show) return

		setSeconds(60)

		const interval = setInterval(() => {
			setSeconds(prev => {
				if (prev <= 1) {
					clearInterval(interval)
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [show])

	const handleOTPChange = value => {
		setOtp(value)
		if (value.length === OTP_LENGTH) {
			void submitOtp(value)
		}
	}

	return (
		<Card className={authCardClass} {...props}>
			<CardHeader className='gap-3 px-5 pb-0 sm:px-6'>
				<CardDescription className='text-center text-sm leading-relaxed text-blue-900/80 sm:text-base'>
					{t('smsCodeSentTo', { phone: phoneDisplay })}
				</CardDescription>
			</CardHeader>
			<CardContent className='px-5 sm:px-6'>
				<FieldGroup className='gap-4'>
					<div className='relative flex justify-center py-1'>
						<InputOTP
							value={otp}
							onChange={handleOTPChange}
							maxLength={OTP_LENGTH}
							disabled={isLoading}
						>
							<InputOTPGroup className={authOtpGroupClass}>
								{[0, 1, 2, 3, 4, 5].map(i => (
									<InputOTPSlot key={i} index={i} />
								))}
							</InputOTPGroup>
						</InputOTP>
						{isLoading ? (
							<div className='absolute inset-0 flex items-center justify-center rounded-lg bg-white/75'>
								<Loader2 className='h-6 w-6 animate-spin text-blue-900' />
							</div>
						) : null}
					</div>

					<FieldDescription className='text-center text-sm'>
						{seconds > 0 ? (
							<span className='text-blue-900/50'>
								{t('resend')} ({seconds}s)
							</span>
						) : (
							<button
								type='button'
								onClick={resendCode}
								disabled={resending}
								className='font-medium text-blue-900 underline-offset-2 hover:underline disabled:opacity-50'
							>
								{resending ? (
									<span className='inline-flex items-center gap-1.5'>
										<Loader2 className='h-4 w-4 animate-spin' />
										{t('resend')}
									</span>
								) : (
									t('resend')
								)}
							</button>
						)}
					</FieldDescription>
				</FieldGroup>
			</CardContent>
		</Card>
	)
}
