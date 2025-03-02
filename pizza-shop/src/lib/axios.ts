import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
	baseURL: env.VITE_API_URL,
	withCredentials: true,
})

if (env.VITE_API_DALEY) {
	api.interceptors.request.use(async (config) => {
		await new Promise((resolve) => setInterval(resolve, env.VITE_API_DALEY))
		return config
	})
}
