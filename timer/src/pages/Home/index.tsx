import { HomeContainer, StartCountDownButton, StopCountDownButton } from './styles'

import { useContext } from 'react'
import { Play, Stop } from 'phosphor-react'
import { z } from 'zod'
import { NewCycleInputs } from './components/NewCycleInputs'
import { CountDown } from './components/Countdown'
import { Cycle, CycleContext } from '../../contexts/CycleContext'

const validateFormSchema = z.object({
	task: z.string().min(1, 'Task name is required'),
	time: z.number().multipleOf(1).max(60, 'Time must be between 5 and 60 minutes'),
})

export function Home() {
	const {
		createNewCycle,
		activeCycle,
		setActiveCycle,
		formData,
		setFormData,
		changeCycleStatus,
	} = useContext(CycleContext)

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
		createNewCycle(newCycle)
		setFormData({ task: '', time: 0 })
	}

	return (
		<HomeContainer>
			<form onSubmit={hundleSubmitNewTask}>
				<NewCycleInputs />
				<CountDown />

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
