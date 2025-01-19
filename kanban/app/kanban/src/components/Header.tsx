import styles from './Header.module.css'

import sun  from '../assets/sun.svg';

export function Header() {
	return(
		<section className={styles.container}>

			<img src={sun}/>
			<span className={styles.redBrick}>Kan</span>
			<span className={styles.blueDark}>ban</span>

		</section>
	)
}