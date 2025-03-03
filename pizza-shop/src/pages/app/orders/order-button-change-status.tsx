import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

type OrderButtonType = {
	orderId: string
	type: string
	disabled: boolean
	onClickFn(variables: { orderId: string }): Promise<void>
}

export function OrderButton({ orderId, type, disabled, onClickFn }: OrderButtonType) {
	return (
		<Button
			variant="outline"
			size="sm"
			className="hover:border-green-700"
			disabled={disabled}
			onClick={() => onClickFn({ orderId: orderId })}
		>
			<ArrowRight className="h-8 w-8" />
			{type}
		</Button>
	)
}
