import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HandCoins } from 'lucide-react'

export function MonthCanceledOrdersAmountCard() {
	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">Cancelamentos de (mês)</CardTitle>
				<HandCoins className="h-5 w-5 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				<span className="text-2xl font-bold tracking-tighter">246</span>
				<p className="text-xs text-muted-foreground">
					<span className="text-emerald-500 dark:text-emerald-400">-14%</span> em relação
					ao mês passado
				</p>
			</CardContent>
		</Card>
	)
}
