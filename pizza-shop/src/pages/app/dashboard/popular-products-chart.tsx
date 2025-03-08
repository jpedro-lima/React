import { getPopularProducts } from '@/api/get-popularproducts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts'

import colors from 'tailwindcss/colors'

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
	payload: { product: string; amount: number }
} & any

const renderActiveShape = (props: RenderActiveShapeProps) => {
	const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props

	return (
		<g>
			<text x={cx} y={cy} dy={135} textAnchor="middle" fill={fill}>
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
				fill={fill}
			>{`${payload.amount}`}</text>
		</g>
	)
}

export function PopularProductsChart() {
	const [activeIndex, setActiveIndex] = useState(0)

	const { data: popularProducts } = useQuery({
		queryKey: ['metrics', 'popular-products'],
		queryFn: getPopularProducts,
	})

	return (
		<Card className="lg:col-span-3">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base font-medium">Produtos populares</CardTitle>
				</div>
			</CardHeader>

			<CardContent>
				{popularProducts && (
					<ResponsiveContainer height={300} width="100%">
						<PieChart>
							<Pie
								activeIndex={activeIndex}
								activeShape={renderActiveShape}
								onMouseEnter={(_, index) => setActiveIndex(index)}
								data={popularProducts}
								dataKey="amount"
								nameKey="product"
								cx="50%"
								cy="50%"
								outerRadius={100}
								innerRadius={75}
								paddingAngle={5}
								strokeWidth={0}
							>
								{popularProducts.map((_, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				)}
			</CardContent>
		</Card>
	)
}
