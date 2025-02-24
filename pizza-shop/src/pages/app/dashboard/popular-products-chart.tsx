import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

import { ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts'

import colors from 'tailwindcss/colors'

const data = [
	{ product: 'Pepperoni', amount: 35 },
	{ product: 'Mussarela', amount: 48 },
	{ product: 'Chicken and chease sllalsallslaslas', amount: 22 },
	{ product: 'Marguerita', amount: 18 },
	{ product: '4 cheases', amount: 31 },
]

const COLORS = [
	colors.sky[700],
	colors.fuchsia[700],
	colors.lime[700],
	colors.orange[700],
	colors.emerald[700],
]

type RenderActiveShapeProps = {
	cx: number
	cy: number
	innerRadius: number
	outerRadius: number
	startAngle: number
	endAngle: number
	fill: string
	payload: (typeof data)[0]
} & any

const renderActiveShape = (props: RenderActiveShapeProps) => {
	const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props
	const theme = localStorage.getItem('pizza-shop-theme') || 'light'

	return (
		<g>
			<text x={cx} y={cy} dy={132} textAnchor="middle" fill={fill}>
				{payload.product}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
				fillOpacity={0.7}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 5}
				outerRadius={outerRadius + 7}
				fill={fill}
			/>
			<text
				x={cx}
				y={cy}
				dy={8}
				textAnchor="middle"
				fontSize={'1.2rem'}
				fill={theme === 'dark' ? colors.gray[300] : colors.gray[700]}
			>{`${payload.amount}`}</text>
		</g>
	)
}

export function PopularProductsChart() {
	const [activeIndex, setActiveIndex] = useState(0)

	return (
		<Card className="lg:col-span-3">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base font-medium">Produtos populares</CardTitle>
				</div>
			</CardHeader>

			<CardContent>
				<ResponsiveContainer height={300} width="100%">
					<PieChart>
						<Pie
							activeIndex={activeIndex}
							activeShape={renderActiveShape}
							onMouseEnter={(_, index) => setActiveIndex(index)}
							data={data}
							dataKey="amount"
							nameKey="product"
							cx="50%"
							cy="50%"
							outerRadius={100}
							innerRadius={80}
							paddingAngle={5}
							strokeWidth={0}
						>
							{data.map((_, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
