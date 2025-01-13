import styles from './Post.module.css';

import { format, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

import { Comment } from './Comment.jsx'
import { useState } from 'react';

export function Post({ author, publishedAt, content }) {
	const formattedDate = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", { locale: ptBR });
	const relativeDate = formatDistance(publishedAt, new Date(), { locale: ptBR, addSuffix: true });

	const [comments, setComment] = useState([
		{
			id: 1,
			content: 'Imagine um excelente comentário aqui!',
		}
	])

	const [newCommentText, setNewCommentText] = useState('');

	function hundleCreateNewComment() {
		event.preventDefault();

		setComment([...comments, { id: comments.length + 1, content: newCommentText }]);
		setNewCommentText('');
	}

	function handleNewCommentChange() {
		setNewCommentText(event.target.value);
	}

	return (
		<article className={styles.post}>
			<header>
				<div className={styles.author}>
					<img src={author.avatarUrl} alt="author avatar" />
					<div className={styles.authorInfo}>
						<strong>{author.name}</strong>
						<span>{author.role}</span>
					</div>
				</div>

				<time title={formattedDate} dateTime={publishedAt.toISOString()}>
					{relativeDate}
				</time>
			</header>

			<div className={styles.content}>
				{ content.map((line) => {

					switch (line.type) {
						case 'paragraph':
							return <p key={line.content}>{line.content}</p>;
						case 'link':
							return <p key={line.content}><a target='_blank' href={ line.url }>{ line.content }</a></p>;
						case 'tags':
							return (
								<p key={line.tags}>{
									line.tags.map(tag => {
										return <a key={tag} target='_blank' href='#'>#{tag}</a>;
									})
								}</p>
							);
					}
				})}
			</div>

			<form onSubmit={hundleCreateNewComment} className={styles.commentForm}>
				<strong>Deixe seu feedback!</strong>
				<textarea
					name='comment'
					placeholder='Deixe seu comentario'
					onChange={handleNewCommentChange}
					value={newCommentText}	
				>
				</textarea>

				<footer>
					<button type='submit'>Comentar</button>
				</footer>
			</form>

			<div className={styles.commentList}>
				{ comments.map(comment => {
					return <Comment key={comment.content} content={comment.content} />
				}) }
				
			</div>
		</article>
	);
}
