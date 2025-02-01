import { HeaderContainer } from './styles'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

import logotype from '../../../../assets/logo-ignite.svg'

export function Header() {
	return (
		<HeaderContainer>
			<NavLink to="/" title="Timer">
				<img src={logotype} alt="" />
			</NavLink>
			<nav>
				<NavLink to="/" title="Timer">
					<Timer size={32} />
				</NavLink>
				<NavLink to="/history" title="History">
					<Scroll size={32} />
				</NavLink>
			</nav>
		</HeaderContainer>
	)
}
