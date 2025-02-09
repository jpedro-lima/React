import { BrowserRouter } from 'react-router'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from '@/components/ui/sonner'
import { Router } from './Router'

import './global.css'

export default function App() {
	return (
		<HelmetProvider>
			<Helmet titleTemplate="%s | pizza.shop" />

			<Toaster richColors />

			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</HelmetProvider>
	)
}
