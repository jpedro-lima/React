import styles from './Comment.module.css';

import avatar from '../assets/rabbit.jpeg';

import { Trash, ThumbsUp } from 'phosphor-react';

export function Comment() {
	return (
		<div className={styles.comment}>
			<img src={avatar} alt="author avatar" />

			<div className={styles.commentBox}>
				
				<div className={styles.commentContent}>
				
					<header>
				
						<div className={styles.authorAndTime}>
							<strong>Tu Shen</strong>
							<time title='11 de Maio às 08:13h' datetime="2022-05-11 08:13:38">Cerca de 1h atrás</time>
						</div>

						<button title='Deletar Comentário'>
							<Trash size={24}/>
						</button>
					</header>

					<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione, voluptatibus.</p>
				
				</div>

				<footer>
					<button>
						<ThumbsUp size={20}/>
						Curtir <span>28</span>
					</button>
				</footer>
				
			</div>
		</div>
	)
}