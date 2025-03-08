import { Home, Pizza, UtensilsCrossed } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { NavLink } from 'react-router'
import { ThemeToggle } from './theme/theme-toggle'
import { AccountMenu } from './account-menu'

export function Header() {
	const navStyle =
		'flex h items-center gap-1.5 text-md font-medium text-muted-foreground p-4 hover:underline hover:underline-offset-[8px]'
	const activeNavStyle = navStyle + ' text-primary'

	return (
		<header className="border-b">
			<div className="flex h-16 items-center gap-6 px-6">
				<NavLink
					to="/"
					title="home"
					className="flex items-center gap-1 text-lg font-medium text-foreground"
				>
					<Pizza className="mr-2 h-5 w-5 stroke-[#e11d48]" />
					<span className="font-semibold">pizza-shop</span>
				</NavLink>

				<Separator orientation="vertical" className="h-6" />

				<nav className="flex items-center space-x-4 lg:space-x-6">
					<NavLink
						to="/dashboard"
						title="dashboard"
						className={({ isActive }) => (isActive ? activeNavStyle : navStyle)}
					>
						<Home className="h-4 w-4" />
						Dashboard
					</NavLink>

					<NavLink
						to="/orders"
						title="orders"
						className={({ isActive }) => (isActive ? activeNavStyle : navStyle)}
					>
						<UtensilsCrossed className="h-4 w-4" />
						Pedidos
					</NavLink>
				</nav>

				<div className="ml-auto flex items-center gap-2">
					<ThemeToggle />
					<AccountMenu />
				</div>
			</div>
		</header>
	)
}
