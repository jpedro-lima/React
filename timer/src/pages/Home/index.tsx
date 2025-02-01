import { HomeContainer, StartCountDownButton, StopCountDownButton } from './styles'

import { createContext, useState } from 'react'
import { Play, Stop } from 'phosphor-react'
import { z } from 'zod'
import { NewCycleInputs } from './components/NewCycleInputs'
import { CountDown } from './components/Countdown'

const validateFormSchema = z.object({
	task: z.string().min(1, 'Task name is required'),
	time: z.number().multipleOf(5).max(60, 'Time must be between 5 and 60 minutes'),
})

type Cycle = {
	id: string
	task: string
	time: number
	startDate: Date
	status: 'completed' | 'interrupted' | 'active'
}

interface CycleContextData {
	activeCycle: Cycle | undefined
	setActiveCycle: (cycle: Cycle | undefined) => void

	formData: { task: string; time: number }
	setFormData: (data: { task: string; time: number }) => void

	changeCycleStatus: (cycleId: string, status: 'completed' | 'interrupted') => void
}

export const CycleContext = createContext({} as CycleContextData)

export function Home() {
	const [formData, setFormData] = useState({ task: '', time: 0 })
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycle, setActiveCycle] = useState<Cycle | undefined>()

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

	function hundleStopCountDown() {
		changeCycleStatus(activeCycle!.id, 'interrupted')
		setActiveCycle(undefined)
	}

	function hundleSubmitNewTask(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const validateForm = validateFormSchema.safeParse({
			task: formData.task,
			time: formData.time,
		})

		if (validateForm.success === false) {
			console.log(validateForm.error.errors)
			return
		}

		const newCycle: Cycle = {
			id: String(new Date().getTime()),
			task: formData.task,
			time: formData.time,
			startDate: new Date(),
			status: 'active',
		}

		setFormData({ task: '', time: 0 })
		setCycles((state) => [...state, newCycle])
		setActiveCycle(newCycle)
	}

	return (
		<HomeContainer>
			<form onSubmit={hundleSubmitNewTask}>
				<CycleContext.Provider
					value={{
						activeCycle,
						setActiveCycle,
						formData,
						setFormData,
						changeCycleStatus,
					}}
				>
					<NewCycleInputs />
					<CountDown />
				</CycleContext.Provider>

				{activeCycle ? (
					<StopCountDownButton type="button" onClick={hundleStopCountDown}>
						<Stop size={32} />
						Stop
					</StopCountDownButton>
				) : (
					<StartCountDownButton disabled={!formData.task || !formData.time} type="submit">
						<Play size={32} />
						Start
					</StartCountDownButton>
				)}
			</form>
		</HomeContainer>
	)
}
