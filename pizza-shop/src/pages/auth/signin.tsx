import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { toast } from 'sonner'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { signin } from '@/api/signin'

const SignInSchema = z.object({
	email: z.string().email().nonempty(),
})

type SignInForm = z.infer<typeof SignInSchema>

//.regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')),
export function Signin() {
	const [searchParams] = useSearchParams()

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<SignInForm>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: searchParams.get('email') ?? '',
		},
	})

	const { mutateAsync: authenticate } = useMutation({ mutationFn: signin })

	async function handleSignin(data: SignInForm) {
		try {
			await authenticate({ email: data.email })

			toast.success('E-mail de autenticação enviado', {
				action: {
					label: 'Reenviar',
					onClick: () => console.log('E-mail de autenticação reenviado'),
				},
			})
		} catch {
			toast.error('Credenciais invalidas')
		}
	}

	const checkErrorsForm = () => {
		if (errors.email) toast.error(errors.email.message)
	}

	return (
		<>
			<Helmet title="Acessar Painel" />

			<Button asChild className="absolute right-8 top-8 border-primary" variant="outline">
				<Link to="/signup">Cadastrar estabelecimento</Link>
			</Button>

			<section className="p-8">
				<div className="flex w-[350px] flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tighter">Acessar Painel</h1>

						<p className="text-sm text-muted-foreground">
							Acompanhar suas vendas pelo painel do parceiro
						</p>
					</div>

					<form className="space-y-4" onSubmit={handleSubmit(handleSignin)}>
						<div className="space-y-2">
							<Label htmlFor="email">Seu e-mail</Label>
							<Input id="email" type="email" required {...register('email')} />
						</div>

						<Button
							type="submit"
							className="w-full"
							disabled={isSubmitting}
							onClick={checkErrorsForm}
						>
							Acessar Painel
						</Button>
					</form>
				</div>
			</section>
		</>
	)
}
