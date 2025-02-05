import { Route, Routes } from 'react-router'
import { Home } from './pages/Home'
import { Signin } from './pages/Signin'
import { AppLayout } from './pages/_layouts/App'
import { AuthLayout } from './pages/_layouts/Auth'

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route path="/" element={<Home />} />
			</Route>
			<Route path="/signin" element={<AuthLayout />}>
				<Route path="/signin" element={<Signin />} />
			</Route>
		</Routes>
	)
}
