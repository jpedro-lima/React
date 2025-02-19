import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Helmet } from 'react-helmet-async'
import { OrderTableRow } from './order-table-row'
import { OrderTableFilters } from './order-table-filters'
import { Pagination } from '@/components/pagination'

export function Orders() {
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
								{Array.from({ length: 10 }).map(() =>
									OrderTableRow({
										id: '123',
										createdAt: 'Há 1 hora',
										status: 'pending',
										clientName: 'Fulano de Tal',
										total: 'R$ 50,00',
									}),
								)}
							</TableBody>
						</Table>
					</div>

					<Pagination pageIndex={0} perPage={10} totalCount={105} />
				</div>
			</div>
		</>
	)
}
