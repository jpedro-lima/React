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
	id?: string
	task: string
	time: number
	startDate: Date
	interrupted?: boolean
}

interface CycleContextData {
	cycles: Cycle[]
	activeCycle: Cycle | undefined
	setActiveCycleId: (id: string | null) => void

	formData: { task: string; time: number }
	setFormData: (data: { task: string; time: number }) => void
}

export const CycleContext = createContext({} as CycleContextData)

export function Home() {
	const [formData, setFormData] = useState({ task: '', time: 0 })
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	function hundleStopCountDown() {
		setActiveCycleId(null)
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, interrupted: true }
				}
				return cycle
			}),
		)
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

		const newCycle = {
			id: String(new Date().getTime()),
			task: formData.task,
			time: formData.time,
			startDate: new Date(),
		}

		setFormData({ task: '', time: 0 })
		setCycles((state) => [...state, newCycle])
		setActiveCycleId(newCycle.id)
	}

	return (
		<HomeContainer>
			<form onSubmit={hundleSubmitNewTask}>
				<CycleContext.Provider
					value={{ cycles, activeCycle, setActiveCycleId, formData, setFormData }}
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
