import { useContext } from 'react'
import { CycleContext } from '../../contexts/CycleContext'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'

export function History() {
	const { cycles } = useContext(CycleContext)

	return (
		<HistoryContainer>
			<h1>My history</h1>

			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Tasks</th>
							<th>Time</th>
							<th>Date</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{cycles.map((cycle) => (
							<tr key={cycle.id}>
								<td>{cycle.task}</td>
								<td>{cycle.time} minutes</td>
								<td>
									{formatDistanceToNow(cycle.startDate, {
										addSuffix: true,
									})}
								</td>
								<td>
									<Status $statusValue={cycle.status}>{cycle.status}</Status>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	)
}
