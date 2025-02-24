import { api } from '@/lib/axios'

export interface SigninRequest {
	email: string
}

export async function signin({ email }: SigninRequest) {
	await api.post('/authenticate', { email })
}
