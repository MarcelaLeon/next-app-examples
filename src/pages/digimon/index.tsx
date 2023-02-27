import Image from 'next/image';
import Link from 'next/link';
import styles from './../../styles/Digimon.module.css';

export type Digimon = { name: string, img: string, level: string }

export interface Props {
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


export const getStaticProps = async () => {
    const response = await fetch('https://digimon-api.vercel.app/api/digimon')
    const data: Digimon[] = await response.json()
    return {
        props: {
            data
        },
        /**Como máximo va a a realizar un intento cada 10 segundos */
        revalidate: 10
    }
}

/** Server Side Rendering - SSR */
/* export const getServerSideProps: GetStaticProps = async (context: any) => {
    const { id } = context.params
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
     const response = await fetch('https://digimon-api.vercel.app/api/digimon')
    const data: Digimon[] = await response.json()
    return {
        props: {
            data
        },
         revalidate: 10
    }
} */
