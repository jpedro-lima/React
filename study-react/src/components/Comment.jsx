import styles from './Comment.module.css';

import avatar from '../assets/tushen.jpeg';

import { Trash, ThumbsUp } from 'phosphor-react';
import { useState } from 'react';
 
export function Comment({ content, onDeleteComment }) {

	const [likeCount, setLikeCount] = useState(0);

	function hundleCommentDelete() {
		if (confirm('Você gostaria de apagar este comentário?')) {
			onDeleteComment(content);
		}
	}

	return (
		<div className={styles.comment}>
			<img src={avatar} alt="author avatar" />

			<div className={styles.commentBox}>
				
				<div className={styles.commentContent}>
				
					<header>
				
						<div className={styles.authorAndTime}>
							<strong>Tu Shen</strong>
							<time title='11 de Maio às 08:13h' dateTime="2022-05-11 08:13:38">Cerca de 1h atrás</time>
						</div>

						<button onClick={hundleCommentDelete} title='Deletar Comentário'>
							<Trash size={24}/>
						</button>
					</header>

					<p>{content}</p>				
				
				</div>

				<footer>
					<button onClick={ () => {setLikeCount( likeCount + 1)} } title='Curtir Comentário'>
						<ThumbsUp size={20}/>
						Curtir <span>{likeCount}</span>
					</button>
				</footer>
				
			</div>
		</div>
	)
}