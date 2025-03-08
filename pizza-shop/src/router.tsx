import { Route, Routes } from 'react-router'
import { Signin } from './pages/auth/signin'
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { Signup } from './pages/auth/signup'
import { Orders } from './pages/app/orders/orders'
import { NotFound } from './pages/errors/404'

export function Router() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route path="/" element={<div />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/orders" element={<Orders />} />
			</Route>

			<Route element={<AuthLayout />}>
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}
