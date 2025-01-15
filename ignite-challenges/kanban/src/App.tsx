import styles  from './App.module.css'

import { Header } from  './components/Header.tsx';

export default function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        {/* <Kanban /> */}
        {/* <Footer /> */}
      </div>
    </>
  )
}
