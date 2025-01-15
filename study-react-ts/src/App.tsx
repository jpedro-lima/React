import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Post } from './components/Post'

import styles from './App.module.css'

import avatarTuShen from './assets/tushen.jpeg'
import avatarXiwangmu from './assets/xiwangmu.jpg'


interface PostProps {
	id: number,
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

const posts: PostProps[] = [
	{
		id: 1,
		publishedAt: new Date('2024-11-13 13:25:00'),
		author: {
			name: 'Tu Shen',
			avatarUrl: avatarTuShen,
			role: 'Espírito Coelho'
		},
		content: [
			{ type: 'paragraph', content: 'Olá, bem-vindo ao meu post!' },
			{ type: 'paragraph', content: 'Estou muito feliz em compartilhar este conteúdo com você. Espero que você goste e aproveite a leitura!' },
			{ type: 'paragraph', content: 'Eu sou Tu Shen, também conhecido como Espírito Coelho. Sou apaixonado por tecnologia e desenvolvimento de software. Adoro aprender coisas novas e compartilhar meu conhecimento com os outros.' },
			{ type: 'link', url: 'https://pt.wikipedia.org/wiki/Tu%27er_Shen', content: 'Clique aqui para saber mais sobre mim' },
			{ type: 'tags', tags: ['firstPost', 'study', 'react'] }
		]
	},
	{
		id: 2,
		publishedAt: new Date('2024-12-22 08:27:33'),
		author: {
			name: 'Xiwangmu',
			avatarUrl: avatarXiwangmu,
			role: 'Rainha Mãe do Oeste'
		},
		content: [
			{ type: 'paragraph', content: 'Olá, queridos leitores!' },
			{ type: 'paragraph', content: 'Eu sou Xiwangmu, também conhecida como Rainha Mãe do Oeste. Sou apaixonada por natureza e espiritualidade. Adoro compartilhar minha sabedoria com os outros.' },
			{ type: 'link', url: 'https://pt.wikipedia.org/wiki/Xi_Wangmu', content: 'Clique aqui para saber mais sobre mim' },
			{ type: 'tags', tags: ['firstPost', 'nature', 'spirituality'] }
		]
	}
];

function App() {
	return (
		<div>
			<Header />
			<div className={styles.wrapper}>
				<Sidebar />

				<main>

					{ posts.map(post => {
						return (
							<Post key={post.id}
								author={post.author} 
								publishedAt={post.publishedAt}
								content={post.content} />
						)
					})}

				</main>

			</div>
		</div>
	)
}

export default App
