import Image from 'next/image';
import Link from 'next/link';
import styles from './../styles/Home.module.css';


export default function Home() {
  return (
    <div>
      <main className={styles.mainContainer}>
        <h3>Digimon</h3>
        <Link href={'/digimon'}>
          <button>See all</button>
        </Link>
      </main>
    </div>
  )
}



