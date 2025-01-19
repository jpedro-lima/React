import styles from './Column.module.css';
import clipboard from '../assets/clipboard.svg';

import { Card, Task } from './Card';

interface ColumProps {
	title: string,
	tasksList: Task[],

	deleteTaskofList: (id: string) => void,
	updateTaskList: (id: string, status: 'backlog' | 'doing' | 'review' | 'done') => void,
};

export function Column(props : ColumProps) {

	const tasks = props.tasksList.filter((task) => task.status === props.title.toLowerCase());

	function handleDrop(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();
		const id = event.dataTransfer.getData('text');

		props.updateTaskList(id, props.title.toLowerCase() as 'backlog' | 'doing' | 'review' | 'done');
	}

	function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
	}

	function deleteTask(id: string) {
		props.deleteTaskofList(id);
	}

	return (
		<section className={styles.column}>
			<header>
				<h1>{props.title}</h1>
				<span>{ tasks.length }</span>
			</header>

			<div
				className={styles.board}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				>

				{tasks.length === 0 ?
					(
						<div className={styles.empty}>
							<div className={styles.square}></div>
							<img src={clipboard} />
							<p><b>You don't have any tasks registered yet.</b></p>
							<p>Create tasks and organize your to-do items.</p>
						</div>
					) 
					: tasks.map((task : Task) => {
							return (<Card
								key={task.id}
								task={task}
								onDeleteTask={deleteTask}
								/>
							)
						})
					}

			</div>

		</section>
	);
}