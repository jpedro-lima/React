import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import {
	ResponsiveContainer,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Line,
} from 'recharts'

import colors from 'tailwindcss/colors'

const data = [
	{ date: '01/01', revenue: 1500 },
	{ date: '03/01', revenue: 800 },
	{ date: '04/01', revenue: 278 },
	{ date: '05/01', revenue: 189 },
	{ date: '06/01', revenue: 239 },
	{ date: '07/01', revenue: 763 },
	{ date: '08/01', revenue: 278 },
	{ date: '09/01', revenue: 48 },
	{ date: '10/01', revenue: 239 },
	{ date: '11/01', revenue: 17 },
	{ date: '12/01', revenue: 278 },
	{ date: '25/01', revenue: 189 },
	{ date: '26/01', revenue: 1000 },
	{ date: '27/01', revenue: 75 },
]

export function RevenueChart() {
	return (
		<Card className="lg:col-span-6">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle className="text-base font-medium">Receita no período</CardTitle>
					<CardDescription>Receira diária no período</CardDescription>
				</div>
			</CardHeader>

			<CardContent>
				<ResponsiveContainer height={300} width="100%">
					<LineChart data={data} style={{ fontSize: '0.875rem' }} margin={{ right: 20 }}>
						<XAxis dataKey="date" tickLine={false} axisLine={false} dy={20} height={60} />
						<YAxis
							stroke="#888"
							axisLine={false}
							tickLine={false}
							width={100}
							dx={-10}
							tickFormatter={(value: number) =>
								value.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})
							}
						/>
						<Line
							type="linear"
							dataKey="revenue"
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
			</CardContent>
		</Card>
	)
}
