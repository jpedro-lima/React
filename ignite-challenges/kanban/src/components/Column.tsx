import styles from './Column.module.css';
import clipboard from '../assets/clipboard.svg';

import { Card, Task } from './Card';

interface ColumProps {
	title: string,
	tasksList?: Task[],
	deleteTaskofList: (id: string) => void,
	updateTaskList: (id: string, status: 'backlog' | 'doing' | 'review' | 'done') => void
};

export function Column({ title, tasksList = [], deleteTaskofList, updateTaskList}: ColumProps) {

	function handleDrop(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();
		const id = event.dataTransfer.getData('text');
		updateTaskList(id, title as 'backlog' | 'doing' | 'review' | 'done');
	}

	function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
	}

	function deleteTask(id: string) {
		deleteTaskofList(id);
	}

	return (
		<section className={styles.column}>
			<header>
				<h1>{title}</h1>
				<span>{tasksList.length}</span>
			</header>

			<div className={styles.board} onDragOver={handleDragOver} onDrop={handleDrop}	>

				{tasksList?.length === 0 ?
					(
						<div className={styles.empty}>
							<div className={styles.square}></div>
							<img src={clipboard} />
							<p><b>You don't have any tasks registered yet.</b></p>
							<p>Create tasks and organize your to-do items.</p>
						</div>
					) 
					: tasksList.map((task : Task) => {
							return <Card key={task.id} task={task} onDeleteTask={deleteTask} />
						})
					}

			</div>

		</section>
	);
}