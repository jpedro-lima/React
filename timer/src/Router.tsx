import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout/index'
import { Home } from './pages/Home'
import { History } from './pages/History/History'
import { CycleContextProvider } from './contexts/CycleContext'

export function Router() {
	return (
		<CycleContextProvider>
			<Routes>
				<Route path="/" element={<DefaultLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/history" element={<History />} />
				</Route>
			</Routes>
		</CycleContextProvider>
	)
}
