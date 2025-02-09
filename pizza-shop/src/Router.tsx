import { Route, Routes } from 'react-router'
import { Signin } from './pages/auth/Signin'
import { AppLayout } from './pages/_layouts/App'
import { AuthLayout } from './pages/_layouts/Auth'
import { Dashboard } from './pages/app/Dashboard'
import { Signup } from './pages/auth/Signup'

export function Router() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route path="/" element={<Dashboard />} />
			</Route>
			<Route element={<AuthLayout />}>
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
			</Route>
		</Routes>
	)
}
