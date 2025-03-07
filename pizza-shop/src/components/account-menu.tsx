import { Building, ChevronDown, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from './ui/dropdown-menu'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getProfile } from '@/api/get-profile'
import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { Skeleton } from './ui/skeleton'
import { Dialog, DialogTrigger } from './ui/dialog'
import { StoreProfileDialog } from './store-profile-dialog'
import { signout } from '@/api/signout'
import { useNavigate } from 'react-router'

export function AccountMenu() {
	const { data: profile, isLoading: isLoadingProfile } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
	})

	const { data: restaurant, isLoading: isLoadingRestaurant } = useQuery({
		queryKey: ['managed-restaurant'],
		queryFn: getManagedRestaurant,
	})

	const navigate = useNavigate()
	const { mutateAsync: signOutFn, isPending: isPendingSignOut } = useMutation({
		mutationKey: ['signout'],
		mutationFn: signout,
		onSuccess: () => {
			navigate('/signin', { replace: true })
		},
	})

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="flex select-none items-center gap-2">
						{isLoadingRestaurant ? <Skeleton className="h-4 w-40" /> : restaurant?.name}
						<ChevronDown className="ml-1 h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="flex flex-col">
						{isLoadingProfile ? (
							<>
								<Skeleton className="h-4 w-14" />
								<Skeleton className="mt-2 h-4 w-40" />
							</>
						) : (
							<>
								<span className="">{profile?.name}</span>
								<span className="text-sm font-normal text-muted-foreground">
									{profile?.email}
								</span>
							</>
						)}
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DialogTrigger asChild>
						<DropdownMenuItem>
							<Building className="mr-2 h-2 w-2" />
							<span>Perfil da loja</span>
						</DropdownMenuItem>
					</DialogTrigger>

					<DropdownMenuItem asChild disabled={isPendingSignOut}>
						<button
							onClick={() => signOutFn()}
							className="w-full text-primary focus:text-primary"
						>
							<LogOut className="mr-2 h-2 w-2" />
							<span>Sair</span>
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<StoreProfileDialog />
		</Dialog>
	)
}
