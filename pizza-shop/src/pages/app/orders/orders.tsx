import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Helmet } from 'react-helmet-async'
import { OrderTableRow } from './order-table-row'
import { OrderTableFilters } from './order-table-filters'
import { Pagination } from '@/components/pagination'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/api/get-orders'
import { useSearchParams } from 'react-router'
import { z } from 'zod'

export function Orders() {
	const [searchParams, setSearchParams] = useSearchParams()

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(searchParams.get('page') ?? '1')

	const orderId = searchParams.get('orderId')
	const customerName = searchParams.get('customerName')
	const status = searchParams.get('status')

	const { data: result } = useQuery({
		queryKey: ['orders', pageIndex, orderId, customerName, status],
		queryFn: () => getOrders({ pageIndex, orderId, customerName, status }),
	})

	function handlePageChange(pageIndex: number) {
		setSearchParams((state) => {
			state.set('page', (pageIndex + 1).toString())
			return state
		})
	}

	return (
		<>
			<Helmet title="Pedidos" />
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
				<div className="space-y-2.5">
					<OrderTableFilters />

					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[4rem]"></TableHead>
									<TableHead className="w-[8.75rem]">Identificador</TableHead>
									<TableHead className="w-[11.25rem]">Realizado há</TableHead>
									<TableHead className="w-[8.75rem]">Status</TableHead>
									<TableHead>Cliente</TableHead>
									<TableHead className="w-[8.75rem]">Total do Pedido</TableHead>
									<TableHead className="w-[10.25rem]"></TableHead>
									<TableHead className="w-[8.25rem]"></TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{result &&
									result.orders.map((order) => (
										<OrderTableRow key={order.orderId} order={order} />
									))}
							</TableBody>
						</Table>
					</div>

					{result && (
						<Pagination
							pageIndex={result.meta.pageIndex}
							perPage={result.meta.perPage}
							totalCount={result.meta.totalCount}
							onPageChange={handlePageChange}
						/>
					)}
				</div>
			</div>
		</>
	)
}
