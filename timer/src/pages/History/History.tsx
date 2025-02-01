import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
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
						<tr>
							<td>Task</td>
							<td>20 minutes</td>
							<td>Há dois meses</td>
							<td>
								<Status statusValue="done">Done</Status>
							</td>
						</tr>
						<tr>
							<td>Task</td>
							<td>20 minutes</td>
							<td>Há dois meses</td>
							<td>
								<Status statusValue="cancelled">Done</Status>
							</td>
						</tr>
						<tr>
							<td>Task</td>
							<td>20 minutes</td>
							<td>Há dois meses</td>
							<td>
								<Status statusValue="done">Done</Status>
							</td>
						</tr>
						<tr>
							<td>Task</td>
							<td>20 minutes</td>
							<td>Há dois meses</td>
							<td>
								<Status statusValue="done">Done</Status>
							</td>
						</tr>
						<tr>
							<td>Task</td>
							<td>20 minutes</td>
							<td>Há dois meses</td>
							<td>
								<Status statusValue="done">Done</Status>
							</td>
						</tr>
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	)
}
