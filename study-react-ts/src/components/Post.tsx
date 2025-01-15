import styles from './Post.module.css';

import { format, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

import { Comment } from './Comment.jsx'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface PostProps {
	publishedAt: Date,
	author: {
		name: string,
		avatarUrl: string,
		role: string,
	},
	content: {
		type: string,
		content?: string,
		tags?: string[],
		url?: string
	}[]
}

export function Post({ author, publishedAt, content }: PostProps) {
	const formattedDate = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", { locale: ptBR });
	const relativeDate = formatDistance(publishedAt, new Date(), { locale: ptBR, addSuffix: true });
	
	const [comments, setComment] = useState([
		'Imagine um excelente comentário aqui!',
	])

	const [newCommentText, setNewCommentText] = useState('');

	function hundleCreateNewComment(event: FormEvent) {
		event.preventDefault();

		setComment([...comments, newCommentText ]);
		setNewCommentText('');
		
		{ 
			const newComment = document.querySelector('textarea[name="comment"]');
			if (!newComment)
				return ;
			newComment.scrollIntoView({ behavior: 'smooth' });
			
			(document.activeElement as HTMLElement).blur();
			
		}
	}

	function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity('');
		setNewCommentText(event.target.value);
	}

	function deleteComment( commentToDelete : string ) {

		const commentWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete);
		setComment([...commentWithoutDeletedOne]);
	}

	function hundleNewInvalidComment( event : InvalidEvent<HTMLTextAreaElement> ) {
		event.target.setCustomValidity('Por favor, preencha o campo de comentário');
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
								<p key={line.tags!.join(' ')}>{
									line.tags!.map(tag => {
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
					onInvalid={hundleNewInvalidComment}
					required
				>
				</textarea>

				<footer>
					<button type='submit' disabled={newCommentText.length === 0}>Comentar</button>
				</footer>
			</form>

			<div className={styles.commentList}>
				{ comments.map(comment => {
					return <Comment key={comment} content={comment} onDeleteComment={deleteComment} />
				}) }
				
			</div>
		</article>
	);
}
