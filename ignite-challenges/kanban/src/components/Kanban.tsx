import styles from './Kanban.module.css';

import { Task } from './Card';
import { Column } from './Column';
import { PlusCircle } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';


export function Kanban() {
	const [taskList, setTasksList] = useState<Task[]>([]);

	const updateTaskList = (id: string, status: 'backlog' | 'doing' | 'review' | 'done') => {
		const updatedTaskList = taskList.map(task => {
			if (task.id === id) {
				return {
					...task,
					status,
				};
			}
			return task;
		});
		setTasksList(updatedTaskList);
	};

	const deleteTaskofList = (id: string) => {
		setTasksList(taskList.filter(task => task.id !== id));
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
			setTasksList([...taskList, newTask]);
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
						{
							['Backlog', 'Doing', 'Review', 'Done'].map((title) => {
								return (
									<Column
										key={title}
										title={title}
										tasksList={taskList}
										deleteTaskofList={deleteTaskofList}
										updateTaskList={updateTaskList}
									/>
								);
							})
						}

					</main>
			</section>
	);
}
