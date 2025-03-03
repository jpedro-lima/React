type OrderStatus = 'pending' | 'processing' | 'canceled' | 'delivered' | 'delivering'

type OrderStatusProps = {
	status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, string> = {
	pending: 'Pendente',
	processing: 'Em preparo',
	canceled: 'Cancelado',
	delivered: 'Entregue',
	delivering: 'Entregando',
}

const orderStatusColorMap: Record<OrderStatus, string> = {
	pending: 'bg-gray-700',
	processing: 'bg-yellow-500',
	canceled: 'bg-rose-500',
	delivered: 'bg-emerald-500',
	delivering: 'bg-orange-700',
}

export function OrderStatus({ status }: OrderStatusProps) {
	console.log('status', status)
	return (
		<div className="flex items-center gap-2">
			<span className={'h-3 w-3 rounded-full ' + orderStatusColorMap[status]} />
			<span className="font-medium text-muted-foreground">{orderStatusMap[status]}</span>
		</div>
	)
}
