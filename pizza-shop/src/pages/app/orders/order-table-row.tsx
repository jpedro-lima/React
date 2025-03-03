import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { ArrowRight, Search, X } from 'lucide-react'
import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type OrderTableRowProps = {
	order: {
		orderId: string
		createdAt: string
		status: 'pending' | 'processing' | 'canceled' | 'delivered' | 'delivering'
		customerName: string
		total: number
	}
}

export function OrderTableRow({ order }: OrderTableRowProps) {
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

			<TableCell className="font-medium">{order.orderId}</TableCell>

			<TableCell className="text-muted-foreground">
				{formatDistanceToNow(new Date(order.createdAt), {
					locale: ptBR,
					addSuffix: true,
				})}
			</TableCell>

			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>

			<TableCell className="font-medium">{order.customerName}</TableCell>

			<TableCell className="font-medium">
				{order.total.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</TableCell>

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
