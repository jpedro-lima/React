import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Signin() {
	return (
		<section className="p-8">
			<div className="align-itens-center flex w-[350px] flex-col justify-center gap-6">
				<div className="flex flex-col gap-2 text-center tracking-tighter">
					<h1 className="text-2xl font-semibold tracking-tighter">Acessar Painel</h1>
					<p className="text-sm text-muted-foreground">
						Acompanhar suas vendas pelo painel do parceiro
					</p>
				</div>
				<form className="space-y-4" action="submit">
					<div className="space-y-2">
						<Label htmlFor="email">Seu e-mail</Label>
						<Input id="email" type="email" />
					</div>

					<Button type="submit" className="w-full">
						Acessar Painel
					</Button>
				</form>
			</div>
		</section>
	)
}
