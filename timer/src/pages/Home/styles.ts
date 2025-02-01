import styled from 'styled-components'

export const HomeContainer = styled.main`
	flex: 1;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3.5rem;
	}
`

const BaseCountDownButton = styled.button`
	width: 100%;
	border: 0;
	border-radius: 8px;
	padding: 1rem;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	color: ${(props) => props.theme['gray-100']};
	font-weight: bold;
	font-size: 1.125rem;

	cursor: pointer;
	transition: transform 0.1s;
`

export const StartCountDownButton = styled(BaseCountDownButton)`
	background: ${(props) => props.theme['green-500']};

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	&:not(:disabled):hover {
		background: ${(props) => props.theme['green-700']};
	}
`

export const StopCountDownButton = styled(BaseCountDownButton)`
	background: ${(props) => props.theme['red-500']};

	&:hover {
		background: ${(props) => props.theme['red-700']};
	}
`
