import styles from './Kanban.module.css';

import { Column } from './Column'
import { PlusCircle } from 'phosphor-react'
import { FormEvent } from 'react';

export function Kanban() {

	function hundleSubmitNewTask(event: FormEvent) {
		event.preventDefault();
		const input = event.target as HTMLFormElement;
		const value = input.querySelector('input')?.value;

		if (value) {
			// createNewTaskInBacklog(value); how
			input.reset();
		}
	}

	return (
		<section className={styles.kanban}>

			<form action="submit" onSubmit={hundleSubmitNewTask}>
				<input type="text" placeholder='Add a task to the Backlog' />

				<button type="submit">
					<span>Create <PlusCircle size={20} weight="bold"/></span>
				</button>
			</form>
			
			<main className={styles.wrapper}>
				<Column title='Backlog' />
				<Column title='Doing' isEmpty={false}/>
				<Column title='Review'/>
				<Column title='Done'/>
			</main>

		</section>
	)
}