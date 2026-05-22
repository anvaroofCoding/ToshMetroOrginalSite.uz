'use client'

import { AuthPageShell } from '@/components/auth-page-shell'
import { SignupForm } from '@/components/signup-form'

export default function Register() {
	return (
		<AuthPageShell contentClassName='max-w-md'>
			<SignupForm />
		</AuthPageShell>
	)
}
