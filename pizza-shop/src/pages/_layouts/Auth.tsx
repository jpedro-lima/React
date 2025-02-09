import { Outlet } from 'react-router'
import { Pizza } from 'lucide-react'

export function AuthLayout() {
	return (
		<div className="grid min-h-screen grid-cols-2">
			<section className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
				<div className="flex items-center gap-1 text-lg font-medium text-foreground">
					<Pizza className="h-5 w-5 stroke-[#e11d48]" />
					<span className="font-semibold">pizza-shop</span>
				</div>

				<footer className="text-sa flex justify-center">
					Painel do parceiro &copy; {new Date().getFullYear()} pizza-shop
				</footer>
			</section>

			<section className="relative flex h-full flex-col items-center justify-center">
				<Outlet />
			</section>
		</div>
	)
}
