import styled from 'styled-components'

export const HistoryContainer = styled.main`
	flex: 1;
	padding: 3.5rem;

	h1 {
		font-size: 2rem;
		color: ${(props) => props.theme['gray-100']};
	}
`

export const HistoryList = styled.div`
	flex: 1;
	overflow: auto;
	margin-top: 2rem;

	table {
		width: 100%;
		border-collapse: collapse;
		min-width: 600px;

		text-align: left;

		th {
			background-color: ${(props) => props.theme['gray-600']};
			padding: 1rem;

			color: ${(props) => props.theme['gray-100']};
			font-size: 1.25rem;
			line-height: 1.6;

			&:first-child {
				border-top-left-radius: 8px;
				padding-left: 1.5rem;
			}

			&:last-child {
				border-top-right-radius: 8px;
				padding-right: 1.5rem;
			}
		}

		td {
			background-color: ${(props) => props.theme['gray-700']};
			border-top: 4px solid ${(props) => props.theme['gray-800']};
			padding: 1rem;

			color: ${(props) => props.theme['gray-100']};
			font-size: 0.875rem;
			line-height: 1.6;

			&:first-child {
				width: 50%;
				padding-left: 1.5rem;
			}

			&:last-child {
				border-top-right-radius: 8px;
			}
		}
	}
`
const STATUS_COLORS = {
	done: 'green-500',
	pending: 'yellow-500',
	cancelled: 'red-500',
}

interface StatusProps {
	statusValue: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	&::before {
		content: '';
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: ${(props) => props.theme[STATUS_COLORS[props.statusValue]]};
	}
`
