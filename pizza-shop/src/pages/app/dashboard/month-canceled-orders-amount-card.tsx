import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amoutn'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { HandCoins } from 'lucide-react'

export function MonthCanceledOrdersAmountCard() {
	const { data: monthCanceledOrdersAmount } = useQuery({
		queryKey: ['metrics', 'month-canceled-orders-amount'],
		queryFn: getMonthCanceledOrdersAmount,
	})

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">Cancelamentos de (mês)</CardTitle>
				<HandCoins className="h-5 w-5 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthCanceledOrdersAmount && (
					<>
						<span className="text-2xl font-bold tracking-tighter">
							{monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
						</span>
						<p className="text-xs text-muted-foreground">
							<span
								className={
									monthCanceledOrdersAmount.diffFromLastMonth >= 0
										? "text-green-600 before:content-['+']"
										: 'text-rose-500'
								}
							>
								{monthCanceledOrdersAmount.diffFromLastMonth}%
							</span>{' '}
							em relação ao mês passado
						</p>
					</>
				)}
			</CardContent>
		</Card>
	)
}
