import { createContext, useState } from 'react'

export type Cycle = {
	id: string
	task: string
	time: number
	startDate: Date
	status: 'completed' | 'interrupted' | 'active'
}

interface CycleContextData {
	cycles: Cycle[]
	setCycles: (cycles: Cycle[]) => void

	activeCycle: Cycle | undefined
	setActiveCycle: (cycle: Cycle | undefined) => void

	formData: { task: string; time: number }
	setFormData: (data: { task: string; time: number }) => void

	changeCycleStatus: (cycleId: string, status: 'completed' | 'interrupted') => void
	createNewCycle: (newCycle: Cycle) => void
}

export const CycleContext = createContext({} as CycleContextData)

export function CycleContextProvider({ children }: { children: React.ReactNode }) {
	const [formData, setFormData] = useState({ task: '', time: 0 })
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycle, setActiveCycle] = useState<Cycle | undefined>()

	function createNewCycle(newCycle: Cycle) {
		setCycles((state) => [...state, newCycle])
		setActiveCycle(newCycle)
	}

	function changeCycleStatus(cycleId: string, status: 'completed' | 'interrupted') {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === cycleId) {
					return { ...cycle, status }
				}
				return cycle
			}),
		)
	}

	return (
		<CycleContext.Provider
			value={{
				cycles,
				setCycles,
				activeCycle,
				setActiveCycle,
				formData,
				setFormData,
				changeCycleStatus,
				createNewCycle,
			}}
		>
			{children}
		</CycleContext.Provider>
	)
}
