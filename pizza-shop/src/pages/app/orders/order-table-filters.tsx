import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { z } from 'zod'

const orderFilterSchema = z.object({
	orderId: z.string().optional(),
	customerName: z.string().optional(),
	status: z.string().optional(),
})

type OrderFilterType = z.infer<typeof orderFilterSchema>

export function OrderTableFilters() {
	const [searchParams, setSearchParams] = useSearchParams()

	const orderId = searchParams.get('orderId')
	const customerName = searchParams.get('customerName')
	const status = searchParams.get('status')

	const { register, handleSubmit, control, reset } = useForm<OrderFilterType>({
		resolver: zodResolver(orderFilterSchema),
		defaultValues: {
			orderId: orderId ?? '',
			customerName: customerName ?? '',
			status: status ?? 'all',
		},
	})

	function handleFilter({ orderId, customerName, status }: OrderFilterType) {
		setSearchParams((state) => {
			if (orderId) state.set('orderId', orderId)
			else state.delete('orderId')

			if (customerName) state.set('customerName', customerName)
			else state.delete('customerName')

			if (status) state.set('status', status)
			else state.delete('status')

			state.set('page', '1')
			return state
		})
	}

	function handleClearFilters() {
		setSearchParams((state) => {
			state.delete('orderId')
			state.delete('customerName')
			state.delete('status')
			state.set('page', '1')

			return state
		})
		reset()
	}

	return (
		<form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
			<span>Filtros:</span>
			<Input
				placeholder="ID do Pedido"
				type="text"
				className="h-8 w-auto"
				{...register('orderId')}
			/>
			<Input
				placeholder="Nome do cliente"
				type="text"
				className="h-8 w-[20rem]"
				{...register('customerName')}
			/>

			<Controller
				control={control}
				name="status"
				render={({ field: { name, onChange, value, disabled } }) => {
					return (
						<Select
							defaultValue="all"
							name={name}
							onValueChange={onChange}
							value={value}
							disabled={disabled}
						>
							<SelectTrigger className="h-8 w-[11.25rem] text-muted-foreground">
								<SelectValue placeholder="Filtre por status" />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value="all">Todos</SelectItem>
								<SelectItem value="pending">Pendente</SelectItem>
								<SelectItem value="canceled">Cancelado</SelectItem>
								<SelectItem value="processing">Em preparo</SelectItem>
								<SelectItem value="delivering">Entregando</SelectItem>
								<SelectItem value="delivered">Entregue</SelectItem>
							</SelectContent>
						</Select>
					)
				}}
			/>

			<Button type="submit" variant="secondary" size="sm">
				<Search className="h-6 w-6" />
				Filtrar Resultados
			</Button>

			<Button type="button" onClick={handleClearFilters} variant="outline" size="sm">
				<X className="h-6 w-6" />
				Remover Filtros
			</Button>
		</form>
	)
}
