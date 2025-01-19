import styles from './Kanban.module.css';

import { Task } from './Card';
import { Column } from './Column';
import { PlusCircle } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';

export function Kanban() {
	const [backlogTasks, setBacklogTasks] = useState<Task[]>([]);
	const [doingTasks, setDoingTasks] = useState<Task[]>([]);
	const [reviewTasks, setReviewTasks] = useState<Task[]>([]);
	const [doneTasks, setDoneTasks] = useState<Task[]>([]);
	
	const updateTaskList = (id: string, status: 'backlog' | 'doing' | 'review' | 'done') => {
		const tasksList = [...backlogTasks, ...doingTasks, ...reviewTasks, ...doneTasks];
		const task = tasksList.find(task => task.id === id);

		tasksList.splice(tasksList.indexOf(task as Task), 1);

		if (task) {
			let newTask = task;
			newTask.status = status;
			tasksList.push(newTask);

			switch (status) {
				case 'backlog':
					setBacklogTasks(tasksList.filter(task => task.status === 'backlog'));
					break;
				case 'doing':
					setDoingTasks(tasksList.filter(task => task.status === 'doing'));
					break;
				case 'review':
					setReviewTasks(tasksList.filter(task => task.status === 'review'));
					break;
				case 'done':
					setDoneTasks(tasksList.filter(task => task.status === 'done'));
					break;
			}

		}
		console.log(backlogTasks, doingTasks, reviewTasks, doneTasks);
	};

	const deleteTaskofList = (id: string) => {
		const tasksList = [...backlogTasks, ...doingTasks, ...reviewTasks, ...doneTasks];

		const task = tasksList.find(task => task.id === id);
		switch (task?.status) {
			case 'backlog':
				setBacklogTasks(backlogTasks.filter(task => task.id !== id));
				break;
			case 'doing':
				setDoingTasks(doingTasks.filter(task => task.id !== id));
				break;
			case 'review':
				setReviewTasks(reviewTasks.filter(task => task.id !== id));
				break;
			case 'done':
				setDoneTasks(doneTasks.filter(task => task.id !== id));
				break;
		}
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
			setBacklogTasks([...backlogTasks, newTask]);
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
						<Column
								title={'Backlog'}
								tasksList={backlogTasks}
								deleteTaskofList={deleteTaskofList}
								updateTaskList={updateTaskList}
						/>
						<Column
								title={'Doing'}
								tasksList={doingTasks}
								deleteTaskofList={deleteTaskofList}
								updateTaskList={updateTaskList}
						/>
						<Column
								title={'Review'}
								tasksList={reviewTasks}
								deleteTaskofList={deleteTaskofList}
								updateTaskList={updateTaskList}
						/>
						<Column
								title={'Done'}
								tasksList={doneTasks}
								deleteTaskofList={deleteTaskofList}
								updateTaskList={updateTaskList}
						/>

					</main>
			</section>
	);
}
