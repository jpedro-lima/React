import { useContext } from 'react'

import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { CycleContext } from '../../../../contexts/CycleContext'

export function NewCycleInputs() {
	const { activeCycle, formData, setFormData } = useContext(CycleContext)

	function hundleInputTask(event: React.ChangeEvent<HTMLInputElement>) {
		setFormData({ ...formData, task: event.target.value })
	}

	function hundleInputMinutes(event: React.ChangeEvent<HTMLInputElement>) {
		setFormData({ ...formData, time: Number(event.target.value) })
	}

	return (
		<FormContainer>
			<label htmlFor="task">I will work on:</label>
			<TaskInput
				id="task"
				placeholder="Give your task a name"
				type="text"
				list="task-suggestions"
				onChange={hundleInputTask}
				value={formData.task}
				disabled={activeCycle !== undefined}
			/>
			<datalist id="task-suggestions">
				<option value="project 1"></option>
				<option value="project 2"></option>
				<option value="Banana"></option>
			</datalist>

			<label htmlFor="minutesAmount">For:</label>
			<MinutesAmountInput
				id="time"
				placeholder="00"
				type="number"
				value={formData.time ? formData.time : ''}
				onChange={hundleInputMinutes}
				disabled={activeCycle !== undefined}
			/>
			<span>minutes</span>
		</FormContainer>
	)
}
