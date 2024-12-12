import styles from './Footer.module.scss'
import Image from 'next/image'

export default function Footer() {
    return (
        <>
            <hr className={styles.footerborder}></hr>
            <footer className='p-12'>
                <div className='m-auto w-fit flex flex-wrap gap-2'>
                    <Image 
                        src='/vmclogo-01.png'
                        width={70}
                        height={70}
                        alt='Valley Music Club Logo'
                    />
                    <p className='block m-auto'>&copy; Valley Music Club, All Rights Reserved</p>
                </div>
            </footer>
        </>
    )
}