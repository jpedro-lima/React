import { z } from 'zod'

const envScheme = z.object({
	VITE_API_URL: z.string().url(),
	VITE_API_DALEY: z.string().transform(Number),
})

export const env = envScheme.parse(import.meta.env)
