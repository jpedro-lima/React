import { HeaderContainer } from './styles'
import logotype from '../../assets/logo-ignite.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
	return (
		<HeaderContainer>
			<img src={logotype} alt="" />
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
