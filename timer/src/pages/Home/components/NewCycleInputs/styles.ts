import styled from 'styled-components'

const BaseInput = styled.input`
	background: transparent;
	height: 2.5rem;
	border: 0;
	border-bottom: 2px solid ${(props) => props.theme['gray-500']};
	padding: 0 0.5rem;

	font-size: 1.125rem;
	font-weight: bold;
	color: ${(props) => props.theme['gray-100']};

	&::placeholder {
		color: ${(props) => props.theme['gray-500']};
	}

	&:focus {
		box-shadow: none;
		border-color: ${(props) => props.theme['green-500']};
	}
	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
`

export const TaskInput = styled(BaseInput)`
	flex: 1;

	[list]::-webkit-calendar-picker-indicator {
		display: none !important;
	}
`

export const MinutesAmountInput = styled(BaseInput)`
	width: 4rem;

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	appearance: textfield;
	-moz-appearance: textfield;

	&::after {
		content: 'min';
		position: absolute;
		right: 0.5rem;
		top: 0.5rem;
		color: ${(props) => props.theme['gray-500']};
	}
`

export const FormContainer = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	color: ${(props) => props.theme['gray-100']};
	font-size: 1.125rem;
	font-weight: bold;
	flex-wrap: wrap;
`
