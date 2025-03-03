import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { Search, X } from 'lucide-react'
import { OrderDetails } from './order-details'
import { OrderStatus, orderStatusMap } from './order-status'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelOrder } from '@/api/cancel-order'
import { toast } from 'sonner'
import { GetOrdersResponse } from '@/api/get-orders'
import { approveOrder } from '@/api/approve-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { OrderButton } from './order-button-change-status'

type OrderTableRowProps = {
	order: {
		orderId: string
		createdAt: string
		status: OrderStatus
		customerName: string
		total: number
	}
}

export function OrderTableRow({ order }: OrderTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false)

	const queryClient = useQueryClient()

	function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
		const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
			queryKey: ['orders'],
		})

		ordersListCache.forEach(([cacheKey, cacheData]) => {
			if (!cacheData) return

			queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
				...cacheData,
				orders: cacheData.orders.map((order) => {
					if (order.orderId === orderId) {
						return { ...order, status: status }
					}
					return order
				}),
			})
		})
		toast.success(`Alterado o status do pedido para ${orderStatusMap[status]}`)
	}

	const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
		mutationFn: cancelOrder,
		onSuccess: (_, { orderId }) => {
			updateOrderStatusOnCache(orderId, 'canceled')
		},
	})

	const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
		mutationFn: approveOrder,
		onSuccess: (_, { orderId }) => {
			updateOrderStatusOnCache(orderId, 'processing')
		},
	})

	const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } = useMutation({
		mutationFn: dispatchOrder,
		onSuccess: (_, { orderId }) => {
			updateOrderStatusOnCache(orderId, 'delivering')
		},
	})

	const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
		mutationFn: deliverOrder,
		onSuccess: (_, { orderId }) => {
			updateOrderStatusOnCache(orderId, 'delivered')
		},
	})

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="sm" className="hover:border-rose-500">
							<Search className="h-8 w-8" />
							<span className="sr-only">Detalhes do pedido</span>
						</Button>
					</DialogTrigger>

					<OrderDetails orderId={order.orderId} open={isDetailsOpen} />
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
				{(order.total / 100).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</TableCell>

			<TableCell>
				{order.status === 'pending' && (
					<OrderButton
						type="Aprovar"
						disabled={isApprovingOrder}
						onClickFn={approveOrderFn}
						orderId={order.orderId}
					/>
				)}
				{order.status === 'processing' && (
					<OrderButton
						type="Em entrega"
						disabled={isDispatchingOrder}
						onClickFn={dispatchOrderFn}
						orderId={order.orderId}
					/>
				)}
				{order.status === 'delivering' && (
					<OrderButton
						type="Entregue"
						disabled={isDeliveringOrder}
						onClickFn={deliverOrderFn}
						orderId={order.orderId}
					/>
				)}
			</TableCell>

			<TableCell>
				<Button
					variant="outline"
					size="sm"
					className="hover:border-destructive"
					disabled={!['pending', 'processing'].includes(order.status) || isCancelingOrder}
					onClick={() => cancelOrderFn({ orderId: order.orderId })}
				>
					<X className="h-8 w-8" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	)
}
