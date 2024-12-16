import styles from './Header.module.scss'
import NavBar from "../NavBar/NavBar";
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className={`${styles.header} sticky top-0 z-10`}>
            <Link href='/' aria-label='Valley Music Club Home'>
                <Image 
                    src='/vmclogo-white-02.png'
                    width={70}
                    height={70}
                    alt='Valley Music Club Logo'
                    className='w-26 h-26 my-auto'
                />
            </Link>
            <NavBar />
        </header>
    )
}