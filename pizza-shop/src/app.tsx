import { BrowserRouter } from 'react-router'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from '@/components/ui/sonner'
import { Router } from './router'
import { ThemeProvider } from './components/theme/theme-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

import './global.css'

export default function App() {
	return (
		<HelmetProvider>
			<Helmet titleTemplate="%s | pizza.shop" />
			<ThemeProvider storageKey="pizza-shop-theme" defaultTheme="dark">
				<Toaster richColors />
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</QueryClientProvider>
			</ThemeProvider>
		</HelmetProvider>
	)
}
