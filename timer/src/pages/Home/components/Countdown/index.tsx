import { useContext, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CountDownContainer, Separator } from './styles'
import { CycleContext } from '../../../../contexts/CycleContext'

export function CountDown() {
	const { activeCycle, setActiveCycle, changeCycleStatus } = useContext(CycleContext)

	const [timeLeft, setTimeLeft] = useState(0)

	const totalSeconds = activeCycle ? activeCycle.time * 60 - timeLeft : 0

	const currentMinutes = Math.floor(totalSeconds / 60)
	const currentSeconds = totalSeconds % 60

	const minutesString = String(currentMinutes).padStart(2, '0')
	const secondsString = String(currentSeconds).padStart(2, '0')

	useEffect(() => {
		if (!activeCycle) {
			setTimeLeft(0)
			return
		}

		const interval = setInterval(() => {
			const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

			if (secondsDifference >= totalSeconds) {
				changeCycleStatus(activeCycle.id, 'completed')
				setActiveCycle(undefined)
				setTimeLeft(0)
			}
			setTimeLeft(secondsDifference)
		}, 1000)

		return () => clearInterval(interval)
	}, [activeCycle])

	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutesString}:${secondsString}`
			return
		}
		document.title = 'Timer'
	}, [activeCycle, minutesString, secondsString])

	return (
		<CountDownContainer>
			<span>{minutesString[0]}</span>
			<span>{minutesString[1]}</span>
			<Separator>:</Separator>
			<span>{secondsString[0]}</span>
			<span>{secondsString[1]}</span>
		</CountDownContainer>
	)
}
