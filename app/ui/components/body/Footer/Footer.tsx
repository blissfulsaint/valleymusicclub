import styles from './Footer.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className='mt-24'>
            <hr className={styles.footerborder}></hr>
            <div className='m-auto w-fit flex flex-wrap gap-2 p-12'>
                <Link href='/' aria-label='Valley Music Club Home'>
                    <Image 
                        src='/vmclogo-01.png'
                        width={70}
                        height={70}
                        alt='Valley Music Club Logo'
                    />
                </Link>
                <p className='block my-auto'>&copy; Valley Music Club, All Rights Reserved</p>
            </div>
        </footer>
    )
}