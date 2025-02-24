import { DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function OrderDetails() {
	return (
		<DialogContent>
			<DialogTitle>Pedido {12312}</DialogTitle>
			<DialogDescription>Detalhes do pedido</DialogDescription>

			<div className="space-y-6">
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="text-muted-foreground">Status</TableCell>

							<TableCell className="flex justify-end">
								<div className="flex items-center gap-2">
									<span className="h-3 w-3 rounded-full bg-gray-700" />
									<span className="font-medium text-muted-foreground">Pendente</span>
								</div>
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="text-muted-foreground">Cliente</TableCell>
							<TableCell className="flex justify-end">Pizzaria del Gatito</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="text-muted-foreground">Telefone</TableCell>
							<TableCell className="flex justify-end">(11) 99999-9999</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="text-muted-foreground">E-mail</TableCell>
							<TableCell className="flex justify-end">genio@fuhba.com</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="text-muted-foreground">Realizado há</TableCell>
							<TableCell className="flex justify-end">3 minutos</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</DialogContent>
	)
}
