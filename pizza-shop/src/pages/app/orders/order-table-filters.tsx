import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Search, X } from 'lucide-react'

export function OrderTableFilters() {
	return (
		<form action="" className="flex items-center gap-2">
			<span>Filtros:</span>
			<Input placeholder="ID do Pedido" type="text" className="h-8 w-auto" />
			<Input placeholder="Nome do cliente" type="text" className="h-8 w-[20rem]" />

			<Select>
				<SelectTrigger className="h-8 w-[11.25rem] text-muted-foreground">
					<SelectValue placeholder="Filtre por status" />
				</SelectTrigger>

				<SelectContent>
					<SelectItem value="All">Todos</SelectItem>
					<SelectItem value="pending">Pendente</SelectItem>
					<SelectItem value="canceled">Cancelado</SelectItem>
					<SelectItem value="processing">Em preparo</SelectItem>
					<SelectItem value="delivering">Entregando</SelectItem>
					<SelectItem value="delivered">Entregue</SelectItem>
				</SelectContent>
			</Select>

			<Button type="submit" variant="secondary" size="sm">
				<Search className="h-6 w-6" />
				Filtrar Resultados
			</Button>

			<Button type="button" variant="outline" size="sm">
				<X className="h-6 w-6" />
				Remover Filtros
			</Button>
		</form>
	)
}
