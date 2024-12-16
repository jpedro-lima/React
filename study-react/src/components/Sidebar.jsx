import styles from './Sidebar.module.css';
import { PencilSimpleLine } from 'phosphor-react'

import avatar from '../assets/rabbit.jpeg';

export function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<img className={styles.cover}
				src="https://plus.unsplash.com/premium_photo-1663013006667-e07512fd39d2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="cover"
			/>

			<div className={styles.profile}>
				<img src={avatar} alt="avatar" />

				<strong>Tu Shen</strong>
				<span>Espírito Coelho</span>
			</div>
			
			<footer>
				<a href="#">
					<PencilSimpleLine size={20}/>
					Editar seu perfil
				</a>
			</footer>
		</aside>
	);
}