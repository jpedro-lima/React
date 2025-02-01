import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		background-color: ${(props) => props.theme['gray-900']};
		color: ${(props) => props.theme['gray-300']};
		font-family: 'Roboto', sans-serif;

		-webkit-font-smoothing: antialiased;
	}

	body, input, textarea, button {
		font: 400 16px 'Roboto', sans-serif;
		font-size: 1rem;
	}

	:focus {
		outline: none;
		box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
	}
`
