import styles from './Card.module.css';

import { Trash } from 'phosphor-react';

interface CardProps {
	content: string
}

export function Card( { content } : CardProps ) {
	return (
		<article className={styles.card}>
			<p>{content}</p>
			<button>
				<Trash size={20} /> 
			</button>
		</article>
	);
}