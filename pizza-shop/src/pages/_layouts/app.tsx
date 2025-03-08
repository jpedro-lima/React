import { Header } from '@/components/header'
import { api } from '@/lib/axios'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

export function AppLayout() {
	const navigate = useNavigate()

	useEffect(() => {
		api.interceptors.response.use(
			(response) => response,
			(error) => {
				if (isAxiosError(error)) {
					const status = error.response?.status
					const code = error.response?.data.code
					if (status === 401 && code === 'UNAUTHORIZED')
						navigate('/signin', { replace: true })
				}
				return Promise.reject(error)
			},
		)
	}, [navigate])

	return (
		<div className="flex min-h-screen flex-col antialiased">
			<Header />

			<div className="flex flex-1 flex-col gap-4 p-8 pt-8">
				<Outlet />
			</div>
		</div>
	)
}
