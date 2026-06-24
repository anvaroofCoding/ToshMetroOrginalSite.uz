'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
	authCardClass,
	authOtpGroupClass,
	authOutlineBtnClass,
	authPrimaryBtnClass,
	authTitleClass,
} from '@/components/auth/auth-styles'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
import {
	formatUzPhoneDisplay,
	formatUzPhoneE164,
	isValidUzPhone,
	UzPhoneInput,
} from '@/components/uz-phone-input'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { cn } from '@/lib/utils'
import { useLoginMutation, useRegisterOtpMutation } from '@/store/services/api'
import { Loader2, Send } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import Dialog01 from './ui/dialog'

const OTP_LENGTH = 6

export function LoginForm({ className, ...props }) {
	const t = useTranslations('menu')
	const [openDialog, setOpenDialog] = useState(false)
	const [Login, { isLoading }] = useLoginMutation()
	const [SendOtp, { isLoading: verifyingOtp }] = useRegisterOtpMutation()
	const [phones, setPhones] = useState('')
	const [otp, setOtp] = useState('')
	const [showOTP, setShowOTP] = useState(false)
	const [seconds, setSeconds] = useState(0)
	const [otpTimerSeed, setOtpTimerSeed] = useState(0)
	const verifyingRef = useRef(false)

	const phoneDisplay = `+998 ${formatUzPhoneDisplay(phones)}`

	const submitOtp = useCallback(
		async code => {
			if (verifyingRef.current || code.length !== OTP_LENGTH) return

			verifyingRef.current = true
			try {
				const response = await SendOtp({ code }).unwrap()
				toast.success(response.message)
				localStorage.setItem('token', response.access)
				window.dispatchEvent(new Event('auth-change'))
				setOpenDialog(true)
			} catch (error) {
				setOtp('')
				toast.error(error?.data?.error || 'Xatolik yuz berdi')
			} finally {
				verifyingRef.current = false
			}
		},
		[SendOtp],
	)

	useEffect(() => {
		if (!showOTP) return

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
	}, [showOTP, otpTimerSeed])

	const requestOtp = async () => {
		if (!isValidUzPhone(phones) || isLoading) return

		try {
			const response = await Login({
				phone: formatUzPhoneE164(phones),
			}).unwrap()

			setShowOTP(true)
			setOtp('')
			setOtpTimerSeed(seed => seed + 1)
			toast.success(response.message)
		} catch (error) {
			toast.error(error?.data?.error || 'Xatolik yuz berdi')
		}
	}

	const handleResend = async () => {
		if (seconds > 0 || isLoading) return
		await requestOtp()
	}

	const handleOTPChange = value => {
		setOtp(value)
		if (value.length === OTP_LENGTH) {
			void submitOtp(value)
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Dialog01 open={openDialog} onOpenChange={setOpenDialog} />
			<Card className={authCardClass}>
				<CardHeader className='gap-3 px-5 pb-0 sm:px-6'>
					{showOTP ? (
						<CardDescription className='text-center text-sm leading-relaxed text-blue-900/80 sm:text-base'>
							{t('smsCodeSentTo', { phone: phoneDisplay })}
						</CardDescription>
					) : (
						<CardTitle className={authTitleClass}>{t('loginTitle')}</CardTitle>
					)}
				</CardHeader>

				<CardContent className='px-5 sm:px-6'>
					{!showOTP ? (
						<FieldGroup className='gap-4'>
							<Field>
								<UzPhoneInput
									id='login-phone'
									value={phones}
									onChange={setPhones}
								/>
							</Field>

							<div className='flex flex-col gap-2.5 sm:flex-row'>
								<Button
									type='button'
									onClick={requestOtp}
									disabled={!isValidUzPhone(phones) || isLoading}
									className={cn(authPrimaryBtnClass, 'flex-1')}
								>
									{isLoading ? (
										<Loader2 className='h-4 w-4 animate-spin' />
									) : (
										<Send className='h-4 w-4' />
									)}
									{t('sendCode')}
								</Button>

								<Button
									variant='outline'
									asChild
									className={cn(authOutlineBtnClass, 'flex-1')}
								>
									<Link href='/royxatdan-otish'>{t('register')}</Link>
								</Button>
							</div>
						</FieldGroup>
					) : (
						<FieldGroup className='gap-4'>
							<div className='relative flex justify-center py-1'>
								<InputOTP
									value={otp}
									onChange={handleOTPChange}
									maxLength={OTP_LENGTH}
									disabled={verifyingOtp}
								>
									<InputOTPGroup className={authOtpGroupClass}>
										{[0, 1, 2, 3, 4, 5].map(i => (
											<InputOTPSlot key={i} index={i} />
										))}
									</InputOTPGroup>
								</InputOTP>
								{verifyingOtp ? (
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
										onClick={handleResend}
										disabled={isLoading}
										className='font-medium text-blue-900 underline-offset-2 hover:underline disabled:opacity-50'
									>
										{isLoading ? (
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
					)}
				</CardContent>
			</Card>
		</div>
	)
}
