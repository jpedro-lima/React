import { api } from '@/lib/axios'

export interface GetOrdersQuery {
	pageIndex?: number | null
	orderId?: string | null
	customerName?: string | null
	status?: string | null
}

export interface GetOrdersResponse {
	orders: {
		orderId: string
		createdAt: string
		status: 'pending' | 'processing' | 'canceled' | 'delivered' | 'delivering'
		customerName: string
		total: number
	}[]
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export async function getOrders(props: GetOrdersQuery) {
	const response = await api.get<GetOrdersResponse>('/orders', {
		params: {
			pageIndex: props.pageIndex,
			orderId: props.orderId,
			customerName: props.customerName,
			status: props.status == 'all' ? null : props.status,
		},
	})
	return response.data
}
