import { GithubLogo, LinkedinLogo } from 'phosphor-react';
import styles from './Footer.module.css';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p>Create by <span>João Pedro</span> in 2025</p>
			<ul>
				<li>
					<a href="https://github.com/jpedro-lima" target="_new">{<GithubLogo size={24} />}</a>
				</li>
				<li>
					<a href="https://www.linkedin.com/in/jpedro-correia" target="_new">{<LinkedinLogo size={24} />}</a>
				</li>
			</ul>
		</footer>
	)
}