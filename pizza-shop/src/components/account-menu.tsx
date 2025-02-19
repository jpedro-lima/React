import { Building, ChevronDown, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from './ui/dropdown-menu'

export function AccountMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="flex select-none items-center gap-2">
					Pizza Shop
					<ChevronDown className="ml-1 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="flex flex-col">
					<span className="">João Pedro</span>
					<span className="text-sm font-normal text-muted-foreground">
						joao@gmail.com
					</span>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<Building className="mr-2 h-2 w-2" />
					<span>Perfil da loja</span>
				</DropdownMenuItem>

				<DropdownMenuItem className="text-primary">
					<LogOut className="mr-2 h-2 w-2" />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
