import { Outlet } from 'react-router'

export function AppLayout() {
	return (
		<div className="grid min-h-screen grid-cols-2">
			<div className="h-full border-r border-foreground"></div>
			<div>
				<Outlet />
			</div>
		</div>
	)
}
