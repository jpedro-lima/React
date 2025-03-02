import { api } from '@/lib/axios'

interface PutProfileBody {
	name: string
	description: string | null
}

export async function putProfile({ name, description }: PutProfileBody) {
	await api.put('/profile', { name, description })
}
