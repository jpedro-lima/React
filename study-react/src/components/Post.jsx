import styles from './Post.module.css';

import avatar from '../assets/rabbit.jpeg';

export function Post() {
	return (
		<article className={styles.post}>
			<header>
				<div className={styles.author}>
					<img src={avatar} alt="author avatar" />
					<div className={styles.authorInfo}>
						<strong>Tu Shen</strong>
						<span>Espírito Coelho</span>
					</div>
				</div>

				<time title='13 de Dezembro de 2024' datetime='2024-12-13 10:00:00'>
						Publicado há 1h
					</time>
			</header>

			<div className={styles.content}>
				<p>Olá, bem-vindo ao meu post!</p>
				
				<p>Estou muito feliz em compartilhar este conteúdo com você. Espero que você goste e aproveite a leitura!</p>

				<p>Eu sou Tu Shen, também conhecido como Espírito Coelho. Sou apaixonado por tecnologia e desenvolvimento de software. Adoro aprender coisas novas e compartilhar meu conhecimento com os outros.</p>

			<p>
				<a href="">#firstPost</a>{' '}
				<a href="">#study</a>{' '}
				<a href="">#react</a>{' '}
			</p>
			</div>

			<form className={styles.commentForm}>
				<strong>Deixe seu feedback!</strong>
				<textarea placeholder='Deixe seu comentario'></textarea>

				<footer>
					<button type='submit'>Comentar</button>
				</footer>
			</form>
		</article>
	);
}
