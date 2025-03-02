import { DialogDescription } from '@radix-ui/react-dialog'
import {
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	getManagedRestaurant,
	GetManagedRestaurantBody,
} from '@/api/get-managed-restaurant'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { putProfile } from '@/api/put-profile'
import { toast } from 'sonner'

const FormSchema = z.object({
	name: z.string(),
	description: z.string().nullable(),
})

type storeProfileForm = z.infer<typeof FormSchema>

export function StoreProfileDialog() {
	const { data: restaurant } = useQuery({
		queryKey: ['managed-restaurant'],
		queryFn: getManagedRestaurant,
	})

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<storeProfileForm>({
		resolver: zodResolver(FormSchema),
		values: {
			name: restaurant?.name ?? '',
			description: restaurant?.description ?? '',
		},
	})

	const queryClient = useQueryClient()

	function updateManagedRestaurantCache({ name, description }: storeProfileForm) {
		const cached = queryClient.getQueryData<GetManagedRestaurantBody>([
			'managed-restaurant',
		])

		if (cached) {
			queryClient.setQueryData(['managed-restaurant'], {
				...cached,
				name,
				description,
			})
		}
		return cached
	}

	const { mutateAsync: updateProfile } = useMutation({
		mutationKey: ['update-profile'],
		mutationFn: putProfile,
		onMutate: ({ name, description }) => {
			return { previousProfile: updateManagedRestaurantCache({ name, description }) }
		},
		onError(_, __, context) {
			if (context?.previousProfile) updateManagedRestaurantCache(context.previousProfile)
		},
	})

	async function handleUpdateProfile(data: storeProfileForm) {
		try {
			await updateProfile({ name: data.name, description: data.description })
			toast.success('Perfil atualizado com sucesso')
		} catch {
			toast.error('Falha ao atualizar o perfil, tente novamente')
		}
	}

	const checkErrorsForm = () => {
		Object.values(errors).forEach((error) => {
			toast.error(error.message)
		})
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Perfil da Loja</DialogTitle>
				<DialogDescription>
					Atualize as informações do seu estabelecimento
				</DialogDescription>
			</DialogHeader>

			<form onSubmit={handleSubmit(handleUpdateProfile)}>
				<div className="space-y-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right" htmlFor="name">
							Nome
						</Label>
						<Input className="col-span-3" id="name" {...register('name')} />
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right" htmlFor="description">
							Descrição
						</Label>
						<Textarea
							className="col-span-3"
							id="description"
							{...register('description')}
						/>
					</div>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Cancelar
						</Button>
					</DialogClose>
					<Button
						type="submit"
						variant="success"
						disabled={isSubmitting}
						onClick={checkErrorsForm}
					>
						Salvar
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	)
}
