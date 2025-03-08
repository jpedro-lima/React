import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'
import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import {
	ResponsiveContainer,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Line,
} from 'recharts'

import colors from 'tailwindcss/colors'

export function RevenueChart() {
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date(),
	})

	const { data: dailyRevenueInPeriod } = useQuery({
		queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
		queryFn: () =>
			getDailyRevenueInPeriod({
				from: dateRange?.from,
				to: dateRange?.to,
			}),
	})

	return (
		<Card className="lg:col-span-6">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle className="text-base font-medium">Receita no período</CardTitle>
					<CardDescription>Receira diária no período</CardDescription>
				</div>

				<div className="flex items-center gap-3">
					<Label>Período</Label>
					<DateRangePicker date={dateRange} onDateChange={setDateRange} />
				</div>
			</CardHeader>

			<CardContent>
				{dailyRevenueInPeriod && (
					<ResponsiveContainer height={300} width="100%">
						<LineChart
							data={dailyRevenueInPeriod}
							style={{ fontSize: '0.875rem' }}
							margin={{ right: 20 }}
						>
							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								dy={20}
								height={60}
							/>
							<YAxis
								stroke="#888"
								axisLine={false}
								tickLine={false}
								width={100}
								dx={-10}
								tickFormatter={(value: number) =>
									(value / 100).toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})
								}
							/>
							<Line
								type="linear"
								dataKey="receipt"
								strokeWidth={2}
								stroke={colors.orange[700]}
								dot={{ r: 4 }}
							/>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								className="stroke-muted-foreground"
							/>
						</LineChart>
					</ResponsiveContainer>
				)}
			</CardContent>
		</Card>
	)
}
