import styles from './Header.module.scss'
import NavBar from "../NavBar/NavBar";
import Image from 'next/image';

export default function Header() {
    return (
        <header className={styles.header}>
            <Image 
                src='/vmclogo-white-02.png'
                width={70}
                height={70}
                alt='Valley Music Club Logo'
                className='w-26 h-26 my-auto'
            />
            <NavBar />
        </header>
    )
}