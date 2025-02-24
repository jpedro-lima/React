import { Home, Menu, Pizza, UtensilsCrossed } from 'lucide-react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet'
import { NavLink } from 'react-router'

export function NavMenuSMDevise() {
	const navStyle =
		'flex items-center gap-1.5 text-md font-medium text-muted-foreground p-4 hover:underline hover:underline-offset-[8px]'
	const activeNavStyle = navStyle + ' text-primary'

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">
					<Menu className="h-8 w-8" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<Pizza className="mr-2 h-5 w-5 stroke-[#e11d48]" />
				</SheetHeader>

				<nav className="flex flex-col items-start">
					<NavLink
						to="/"
						title="Home"
						className={({ isActive }) => (isActive ? activeNavStyle : navStyle)}
					>
						<Home className="h-4 w-4" />
						Início
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
			</SheetContent>
		</Sheet>
	)
}
