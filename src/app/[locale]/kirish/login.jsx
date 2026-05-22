'use client'

import { AuthPageShell } from '@/components/auth-page-shell'
import { LoginForm } from '@/components/login-form'

export default function Login() {
	return (
		<AuthPageShell>
			<LoginForm />
		</AuthPageShell>
	)
}
