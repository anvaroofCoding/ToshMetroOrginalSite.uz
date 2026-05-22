'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

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

const compactBtnClass = 'h-9 gap-1.5 px-4 text-sm font-medium'
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
			<Card>
				<CardHeader>
					{showOTP ? (
						<CardDescription className='text-center text-base leading-relaxed text-foreground'>
							{t('smsCodeSentTo', { phone: phoneDisplay })}
						</CardDescription>
					) : (
						<CardTitle>{t('loginTitle')}</CardTitle>
					)}
				</CardHeader>

				<CardContent>
					{!showOTP ? (
						<FieldGroup>
							<Field>
								<UzPhoneInput
									id='login-phone'
									value={phones}
									onChange={setPhones}
								/>
							</Field>

							<div className='flex flex-col gap-2 pt-1 sm:flex-row'>
								<Button
									type='button'
									size='sm'
									onClick={requestOtp}
									disabled={!isValidUzPhone(phones) || isLoading}
									className={cn(
										compactBtnClass,
										'flex-1 bg-blue-800 text-white hover:bg-blue-700 disabled:opacity-50',
									)}
								>
									{isLoading ? (
										<Loader2 className='h-3.5 w-3.5 animate-spin' />
									) : (
										<Send className='h-3.5 w-3.5' />
									)}
									{t('sendCode')}
								</Button>

								<Button
									variant='outline'
									size='sm'
									asChild
									className={cn(
										compactBtnClass,
										'flex-1 border-blue-200 text-blue-800 hover:bg-blue-50',
									)}
								>
									<Link href='/royxatdan-otish'>{t('register')}</Link>
								</Button>
							</div>
						</FieldGroup>
					) : (
						<FieldGroup>
							<div className='relative flex justify-center'>
								<InputOTP
									value={otp}
									onChange={handleOTPChange}
									maxLength={OTP_LENGTH}
									disabled={verifyingOtp}
								>
									<InputOTPGroup className='gap-2.5 *:rounded-md *:border'>
										{[0, 1, 2, 3, 4, 5].map(i => (
											<InputOTPSlot key={i} index={i} />
										))}
									</InputOTPGroup>
								</InputOTP>
								{verifyingOtp ? (
									<div className='absolute inset-0 flex items-center justify-center rounded-md bg-white/70'>
										<Loader2 className='h-6 w-6 animate-spin text-blue-800' />
									</div>
								) : null}
							</div>

							<FieldDescription className='text-center'>
								{seconds > 0 ? (
									<span className='text-muted-foreground'>
										{t('resend')} ({seconds}s)
									</span>
								) : (
									<button
										type='button'
										onClick={handleResend}
										disabled={isLoading}
										className='text-primary underline underline-offset-2 disabled:opacity-50'
									>
										{isLoading ? (
											<span className='inline-flex items-center gap-1'>
												<Loader2 className='h-3.5 w-3.5 animate-spin' />
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
