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

	dragging: boolean,
	handleDragging: (dragging: boolean) => void,
}

export function Card( { task , onDeleteTask, dragging, handleDragging} : CardProps ) {

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData('text', `${task.id}`)
		handleDragging(true);
	}

	function handlerDeleteTask() {
		if (confirm('Would you like to delete this task?')) {
			onDeleteTask(task.id);
		}
	}

	return (
		<article
			className={dragging ? `${styles.card} ${styles.dragging}` : styles.card}
			onDragStart={handleDragStart}
			onDragEnd={() => handleDragging(false)}
			draggable
			>
			
			<p>{task.content}</p>
			<button onClick={handlerDeleteTask}>
				<Trash size={20} /> 
			</button>
		</article>
	);
}