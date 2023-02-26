import { GetStaticProps } from 'next';
import Image from 'next/image';
import styles from './../../styles/Home.module.css';

type Digimon = { name: string, img: string, level: string }

interface Props {
    data: Digimon[]
}

interface Params {
    params: object
}

export default function Home({ data }: Props) {
    return (
        <div>
            <main className={styles.main}>
                <div>
                    <ul className={styles.list}>

                        {data?.map(digimon => (
                            <li key={digimon.name} className={styles.card}>
                                <h2>{digimon.name}</h2>
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



/** Static Side Generation - SSG */
/* export const getStaticProps: GetStaticProps = async (context: any) => {
    const { id } = context.params
    const response = await fetch('https://digimon-api.vercel.app/api/digimon/name/' + id)
    const data: Digimon[] = await response.json()
    return {
        props: {
            data
        }
    }
} */

/** Server Side Rendering - SSR */
export const getServerSideProps: GetStaticProps = async (context: any) => {
    const { id } = context.params
    const response = await fetch('https://digimon-api.vercel.app/api/digimon/name/' + id)
    const data: Digimon[] = await response.json()
    return {
        props: {
            data
        }
    }
}

export async function getStaticPaths() {
    const response = await fetch('https://digimon-api.vercel.app/api/digimon')
    const data: Digimon[] = await response.json()
    const paths: Params[] = []
    data.map((digimon) => {
        paths.push({ params: { id: digimon.name } })
    })

    return {
        //paths: [{ params: { id: 'Koromon' } }, { params: { id: 'Yokomon' } }],
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
}