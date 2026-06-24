'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export const UZ_PHONE_DIGITS_LENGTH = 9

/** Faqat O'zbekiston raqami: 998 dan keyin 9 ta raqam */
export function normalizeUzPhoneDigits(raw) {
	let digits = String(raw ?? '').replace(/\D/g, '')

	if (digits.startsWith('998')) {
		digits = digits.slice(3)
	}

	while (digits.length > 0 && digits[0] === '0') {
		digits = digits.slice(1)
	}

	return digits.slice(0, UZ_PHONE_DIGITS_LENGTH)
}

export function formatUzPhoneE164(digits) {
	return `+998${digits}`
}

export function isValidUzPhone(digits) {
	return digits.length === UZ_PHONE_DIGITS_LENGTH
}

/** Ko'rinish: (90) 123-45-67 */
export function formatUzPhoneDisplay(digits) {
	const d = normalizeUzPhoneDigits(digits)

	if (d.length === 0) return ''
	if (d.length <= 2) return `(${d}${d.length === 2 ? ')' : ''}`

	let formatted = `(${d.slice(0, 2)}) ${d.slice(2, 5)}`
	if (d.length > 5) formatted += `-${d.slice(5, 7)}`
	if (d.length > 7) formatted += `-${d.slice(7, 9)}`

	return formatted
}

export function UzPhoneInput({
	value,
	onChange,
	id,
	placeholder = '(90) 123-45-67',
	disabled = false,
	className,
	inputClassName,
}) {
	const displayValue = formatUzPhoneDisplay(value)

	const handleChange = e => {
		const inputVal = e.target.value
		let newDigits = normalizeUzPhoneDigits(inputVal)

		// () yoki - o'chirilganda raqam ham kamayishi kerak (masalan "(90)" -> "(9")
		if (
			inputVal.length < displayValue.length &&
			newDigits.length >= value.length &&
			value.length > 0
		) {
			newDigits = value.slice(0, -1)
		}

		onChange(newDigits)
	}

	const handleKeyDown = e => {
		if ((e.key !== 'Backspace' && e.key !== 'Delete') || !value.length) return

		const input = e.currentTarget
		const pos = input.selectionStart ?? 0
		const end = input.selectionEnd ?? 0

		if (pos !== end) return

		const charBefore = displayValue[pos - 1]
		if (pos > 0 && charBefore && !/\d/.test(charBefore)) {
			e.preventDefault()
			onChange(value.slice(0, -1))
		}
	}

	return (
		<div
			className={cn(
				'flex overflow-hidden rounded-xl border border-blue-200 bg-white shadow-sm transition-[color,box-shadow] focus-within:border-blue-900 focus-within:ring-[3px] focus-within:ring-blue-900/20',
				className,
			)}
		>
			<div className='flex shrink-0 items-center border-r border-blue-200 bg-blue-50 px-3'>
				<span className='text-sm font-semibold text-blue-900'>+998</span>
			</div>
			<Input
				id={id}
				type='tel'
				inputMode='numeric'
				autoComplete='tel-national'
				disabled={disabled}
				value={displayValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				maxLength={17}
				className={cn(
					'h-11 flex-1 rounded-none border-0 bg-white px-3 text-base text-blue-900 shadow-none placeholder:text-blue-300 focus-visible:ring-0',
					inputClassName,
				)}
			/>
		</div>
	)
}
