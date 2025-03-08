import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { HandCoins } from 'lucide-react'

export function MonthOrdersAmountCard() {
	const { data: monthOrdersAmount } = useQuery({
		queryKey: ['metrics', 'month-orders-amount'],
		queryFn: getMonthOrdersAmount,
	})

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">Pedidos de (mês)</CardTitle>
				<HandCoins className="h-5 w-5 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthOrdersAmount && (
					<>
						<span className="text-2xl font-bold tracking-tighter">
							{monthOrdersAmount.amount.toLocaleString('pt-BR')}
						</span>
						<p className="text-xs text-muted-foreground">
							<span
								className={
									monthOrdersAmount.diffFromLastMonth >= 0
										? "text-green-500 before:content-['+']"
										: 'text-rose-500'
								}
							>
								{monthOrdersAmount.diffFromLastMonth}%
							</span>{' '}
							em relação ao mês passado
						</p>
					</>
				)}
			</CardContent>
		</Card>
	)
}
