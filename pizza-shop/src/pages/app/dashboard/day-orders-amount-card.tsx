import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HandCoins } from 'lucide-react'

export function DayOrdersAmountCard() {
	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between pb-2">
				<CardTitle className="text-base font-semibold">Pedidos de hoje</CardTitle>
				<HandCoins className="h-5 w-5 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				<span className="text-2xl font-bold tracking-tighter">12</span>
				<p className="text-xs text-muted-foreground">
					<span className="text-rose-500 dark:text-rose-400">-4%</span> em relação a ontem
				</p>
			</CardContent>
		</Card>
	)
}
