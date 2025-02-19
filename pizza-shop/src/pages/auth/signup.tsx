import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { toast } from 'sonner'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const SignUpSchema = z.object({
	restaurantName: z.string(),
	managerName: z.string(),
	email: z.string().email(),
	phone: z
		.string()
		.regex(
			new RegExp('^([+]?[\s0-9]+)?(\\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$'),
			'Invalid Phone Number',
		),
})

type SignUpForm = z.infer<typeof SignUpSchema>

//.regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')),
export function Signup() {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<SignUpForm>({
		resolver: zodResolver(SignUpSchema),
	})

	async function handleSignup(data: SignUpForm) {
		toast.success('Cadastro realizado com sucesso!', {
			action: {
				label: 'Login',
				onClick: () => navigate('/signin'),
			},
		})
		console.log(data)

		await new Promise((resolve) => setTimeout(resolve, 2000))
	}

	const checkErrorsForm = () => {
		console.log(errors)
		Object.values(errors).forEach((error) => {
			toast.error(error.message)
		})
	}

	return (
		<>
			<Helmet title="Cadastrar" />

			<Button asChild className="absolute right-8 top-8 border-primary" variant="outline">
				<Link to="/signin">Acesar Painel</Link>
			</Button>

			<section className="p-8">
				<div className="flex w-[350px] flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tighter">Cadastrar</h1>

						<p className="text-sm text-muted-foreground">
							Seja um parceiro e comece suas vendas!
						</p>
					</div>

					<form className="space-y-4" onSubmit={handleSubmit(handleSignup)}>
						<div className="space-y-2">
							<Label htmlFor="restaurantName">Nome do estabelecimento</Label>
							<Input
								id="restaurantName"
								type="text"
								required
								{...register('restaurantName')}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="managerName">Seu nome</Label>
							<Input id="managerName" type="text" required {...register('managerName')} />
						</div>

						<div className="space-y-2">
							<Label htmlFor="phone">Telefone</Label>
							<Input id="phone" type="tel" required {...register('phone')} />
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Seu e-mail</Label>
							<Input id="email" type="email" required {...register('email')} />
						</div>

						<Button
							type="submit"
							disabled={isSubmitting}
							onClick={checkErrorsForm}
							className="w-full"
						>
							Finalizar Cadastro
						</Button>

						<p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
							Ao continuar você concorda com nossos{' '}
							<a href="#" className="underline underline-offset-4 hover:text-primary">
								Termos de Serviço
							</a>{' '}
							e{' '}
							<a href="#" className="underline underline-offset-4 hover:text-primary">
								Política de Privacidade
							</a>
						</p>
					</form>
				</div>
			</section>
		</>
	)
}
