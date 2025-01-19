import styles from './Card.module.css';

import { Trash } from 'phosphor-react';

export interface Task {
	id: string,
	content: string,
	status: 'backlog' | 'doing' | 'review' | 'done';
};

interface CardProps {
	task: Task,
	onDeleteTask: (id: string) => void,
}

export function Card( { task , onDeleteTask} : CardProps ) {

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData('text', `${task.id}`)
		//handleDragging(true)
	}

	function hundlerDeleteTask() {
		if (confirm('Would you like to delete this task?')) {
			onDeleteTask(task.id);
		}
	}

	return (
		<article
			className={styles.card}
			onDragStart={handleDragStart}
			draggable
			>
			
			<p>{task.content}</p>
			<button onClick={hundlerDeleteTask}>
				<Trash size={20} /> 
			</button>
		</article>
	);
}