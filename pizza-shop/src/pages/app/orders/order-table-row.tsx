import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { ArrowRight, Search, X } from 'lucide-react'
import { OrderDetails } from './order-details'

export type OrderTableRowProps = {
	id: string
	createdAt: string
	status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
	clientName: string
	total: string
}

export function OrderTableRow(props: OrderTableRowProps) {
	return (
		<TableRow>
			<TableCell>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="sm" className="hover:border-rose-500">
							<Search className="h-8 w-8" />
							<span className="sr-only">Detalhes do pedido</span>
						</Button>
					</DialogTrigger>

					<OrderDetails />
				</Dialog>
			</TableCell>

			<TableCell className="font-medium">{props.id}</TableCell>

			<TableCell className="text-muted-foreground">{props.createdAt}</TableCell>

			<TableCell>
				<div className="flex items-center gap-2">
					<span className="h-3 w-3 rounded-full bg-gray-700" />
					<span className="font-medium text-muted-foreground">{props.status}</span>
				</div>
			</TableCell>

			<TableCell className="font-medium">{props.clientName}</TableCell>

			<TableCell className="font-medium">{props.total}</TableCell>

			<TableCell>
				<Button variant="outline" size="sm" className="hover:border-green-700">
					<ArrowRight className="h-8 w-8" />
					Aprovar
				</Button>
			</TableCell>

			<TableCell>
				<Button variant="outline" size="sm" className="hover:border-destructive">
					<X className="h-8 w-8" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	)
}
