import { Route, Routes } from 'react-router'
import { Signin } from './pages/auth/Signin'
import { AppLayout } from './pages/_layouts/App'
import { AuthLayout } from './pages/_layouts/Auth'
import { Dashboard } from './pages/app/Dashboard'

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route path="/" element={<Dashboard />} />
			</Route>
			<Route path="/signin" element={<AuthLayout />}>
				<Route path="/signin" element={<Signin />} />
			</Route>
		</Routes>
	)
}
