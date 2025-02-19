import { BrowserRouter } from 'react-router'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from '@/components/ui/sonner'
import { Router } from './router'

import './global.css'
import { ThemeProvider } from './components/theme/theme-provider'

export default function App() {
	return (
		<HelmetProvider>
			<Helmet titleTemplate="%s | pizza.shop" />
			<ThemeProvider storageKey="pizza-shop-theme">
				<Toaster richColors />

				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</ThemeProvider>
		</HelmetProvider>
	)
}
