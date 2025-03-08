import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

export function MonthRevenueCard() {
	const { data: monthRevenue } = useQuery({
		queryKey: ['metrics', 'month-revenue'],
		queryFn: getMonthRevenue,
	})

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">Receita total de (mês)</CardTitle>
				<DollarSign className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthRevenue && (
					<>
						<span className="text-2xl font-bold tracking-tighter">
							{(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</span>
						<p className="text-xs text-muted-foreground">
							<span
								className={
									monthRevenue.diffFromLastMonth >= 0
										? 'text-green-500 before:content-["+"]'
										: 'text-rose-500'
								}
							>
								{monthRevenue.diffFromLastMonth}%
							</span>{' '}
							em relação ao mês passado
						</p>
					</>
				)}
			</CardContent>
		</Card>
	)
}
