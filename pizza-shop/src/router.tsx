import { Route, Routes } from 'react-router'
import { Signin } from './pages/auth/signin'
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { Signup } from './pages/auth/signup'
import { Orders } from './pages/app/orders/orders'

export function Router() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route path="/" element={<Dashboard />} />
				<Route path="/home" element={<p>home</p>} />
				<Route path="/orders" element={<Orders />} />
			</Route>

			<Route element={<AuthLayout />}>
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
			</Route>
		</Routes>
	)
}
