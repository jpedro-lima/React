import styles from './Column.module.css';
import clipboard from '../assets/clipboard.svg';

import { Card } from './Card';

interface ColumProps {
	title: string,
	isEmpty?: boolean,
	createNewTask?: (task: string) => void
};

export function Column({ title, isEmpty = true }: ColumProps) {
	return (
		<section className={styles.column}>
			<header>
				<h1>{title}</h1>
				<span>0</span>
			</header>

			<div className={styles.board}>

				{isEmpty ?
					(
						<div className={styles.empty}>
							<div className={styles.square}></div>
							<img src={clipboard} />
							<p><b>You don't have any tasks registered yet.</b></p>
							<p>Create tasks and organize your to-do items.</p>
						</div>
					) 
					: <Card content='Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.'/>
				}

			</div>

		</section>
	);
}