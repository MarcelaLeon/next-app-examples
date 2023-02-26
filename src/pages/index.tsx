import Image from 'next/image';
import Link from 'next/link';
import styles from './../styles/Home.module.css';

interface Props {
  data: Digimon[]
}

export default function Home({ data }: Props) {
  return (
    <div>
      <main className={styles.main}>
        <div>
          <ul className={styles.list}>
            {data?.map(digimon => (

              <li key={digimon.name} className={styles.card}>
                <Link href={'digimon/' + digimon.name}>
                  <h2>{digimon.name}</h2>
                </Link>
                <Image src={digimon.img} alt='digimon' width={300} height={350} />
                <p>{digimon.level}</p>
              </li>

            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

type Digimon = { name: string, img: string, level: string }

export const getStaticProps = async () => {
  const response = await fetch('https://digimon-api.vercel.app/api/digimon')
  const data: Digimon[] = await response.json()
  return {
    props: {
      data
    }
  }
}
