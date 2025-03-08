import { getDayOrdersAmount } from '@/api/get-day-orders'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { HandCoins } from 'lucide-react'

export function DayOrdersAmountCard() {
	const { data: dayOrdersAmount } = useQuery({
		queryKey: ['metrics', 'day-orders-amount'],
		queryFn: getDayOrdersAmount,
	})

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">Pedidos de hoje</CardTitle>
				<HandCoins className="h-5 w-5 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{dayOrdersAmount && (
					<>
						<span className="text-2xl font-bold tracking-tighter">
							{dayOrdersAmount.amount.toLocaleString('pt-BR')}
						</span>
						<p className="text-xs text-muted-foreground">
							<span
								className={
									dayOrdersAmount.diffFromYesterday >= 0
										? "text-green-600 before:content-['+']"
										: 'text-rose-500'
								}
							>
								{dayOrdersAmount.diffFromYesterday}%
							</span>{' '}
							em relação a ontem
						</p>
					</>
				)}
			</CardContent>
		</Card>
	)
}
