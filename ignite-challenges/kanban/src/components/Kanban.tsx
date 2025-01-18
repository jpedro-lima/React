import styles from './Kanban.module.css';

import { Task } from './Card';
import { Column } from './Column';
import { PlusCircle } from 'phosphor-react';
import { FormEvent, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

type ColumnsList = {
		title: string;
		fuckList: Task[];
};

export function Kanban() {

	const [tasksList, setTasksList] = useState<Task[]>([]);
	const [columns, setColumns] = useState<ColumnsList[]>([
		{ title: 'Backlog', fuckList: [] },
		{ title: 'Doing', fuckList: [] },
		{ title: 'Review', fuckList: [] },
		{ title: 'Done', fuckList: [] },
	]);

	useEffect(() => {
			const newColumns = columns.map(column => {
				console.log('column', column);
				return {
					...column,
					fuckList: tasksList.filter(task => task.status == column.title.toLowerCase())
				};
			});
			setColumns(newColumns);

			// console.log('tasksList', tasksList);
			// console.log('columns', columns);
    }, [tasksList]);
	
	const updateTaskList = (id: string, status: 'backlog' | 'doing' | 'review' | 'done') => {
		setTasksList(prevTasks =>
			prevTasks.map(task =>
				task.id === id ? { ...task, status } : task
			)
		);
	};

	const deleteTaskofList = (id: string) => {
		setTasksList(prevTasks => prevTasks.filter(task => task.id !== id));
	};

	const handleSubmitNewTask = (event: FormEvent) => {
		event.preventDefault();

		const input = event.target as HTMLFormElement;
		const value = input.querySelector('input')?.value;

		if (value) {
			const newTask: Task = {
				id: uuid(),
				content: value,
				status: 'backlog',
			};
			setTasksList(prevTasks => [...prevTasks, newTask]);
			input.reset();
		}
	};

	return (
			<section className={styles.kanban}>
					<form onSubmit={handleSubmitNewTask}>
							<input
									type="text"
									placeholder="Add a task to the Backlog"
									required
							/>
							<button type="submit">
									<span>
											Create <PlusCircle size={20} weight="bold" />
									</span>
							</button>
					</form>

					<main className={styles.wrapper}>
							{columns.map(column => (
								<Column
										key={column.title}
										title={column.title}
										tasksList={column.fuckList}
										deleteTaskofList={deleteTaskofList}
										updateTaskList={updateTaskList}
								/>
							))}

					</main>
			</section>
	);
}
