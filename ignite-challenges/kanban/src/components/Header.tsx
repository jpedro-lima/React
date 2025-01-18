import styles from './Header.module.css'

import rocket  from '../assets/rocket.svg';

export function Header() {
	return(
		<section className={styles.container}>

			<img src={rocket}/>
			<span className={styles.redBrick}>Kan</span>
			<span className={styles.blueDark}>ban</span>

		</section>
	)
}