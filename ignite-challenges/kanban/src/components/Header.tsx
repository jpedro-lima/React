import styles from './Header.module.css'

import rocket  from '../assets/rocket.svg';

export function Header() {
	return(
		<div className={styles.container}>

			<img src={rocket}/>
			<span className={styles.blue}>Kan</span>
			<span className={styles.purple}>ban</span>

		</div>
	)
}