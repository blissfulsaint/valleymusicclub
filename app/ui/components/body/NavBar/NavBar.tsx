'use client';
import styles from './NavBar.module.scss';
import { useState, useEffect } from 'react';
import { useAuthStatus } from '@/app/hooks/useAuthStatus';
import Link from 'next/link';

const links = [
    {
        pageTitle: 'Home',
        href: '/',
        ariaLabel: 'Valley Music Club Home',
    },
    {
        pageTitle: 'About Us',
        href: '/about',
        ariaLabel: 'Learn about Valley Music Club',
    }
]

export default function NavBar() {
    const { isAuthenticated } = useAuthStatus();
    const [isOpen, setIsOpen] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsResizing(true);
            const resizeTimeout = setTimeout(() => setIsResizing(false), 200);
            return () => clearTimeout(resizeTimeout);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className='grow justify-end'>
            <div 
                className='w-fit p-6 py-8 cursor-pointer float-right md:hidden'
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls='navbar-menu'
            ><span className={`${styles.navicon} ${isOpen ? styles.naviconChecked : ''}`}></span></div>
            <ul 
                className={`fixed z-10 top-0 left-0 h-screen bg-zinc-900 p-8 pr-10 flex flex-col gap-y-5
                ${isResizing ? '' : 'transition-transform duration-300 ease-in-out'}
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 md:static md:bg-transparent md:flex md:h-fit md:flex-row flex-wrap md:gap-y-0 gap-x-5 md:justify-end text-slate-300 md:my-6 md:p-0 md:pr-6 md:block md:transition-none`}
            >
                {links.map((link, index) => {
                    return (
                        <li key={index} className='hover:text-white cursor-pointer transition duration 150'>
                            <Link href={link.href} aria-label={link.ariaLabel} onClick={handleLinkClick}>
                                {link.pageTitle}
                            </Link>
                        </li>
                    )
                })}
                {isAuthenticated && 
                    <li key='account-home' className='hover:text-white cursor-pointer transition duration 150'>
                        <Link href='/account' aria-label='View your account dashboard.' onClick={handleLinkClick}>
                            Account Home
                        </Link>
                    </li>
                }
                {isAuthenticated ? (
                    <li key='logout' className='hover:text-white cursor-pointer transition duration 150'>
                        <Link href='/logout' aria-label='Logout and end user session.' onClick={handleLinkClick}>
                            Logout
                        </Link>
                    </li>
                ) : (
                    <li key='login' className='hover:text-white cursor-pointer transition duration 150'>
                        <Link href='/login' aria-label='Login or Create an Account.' onClick={handleLinkClick}>
                            Login
                        </Link>
                    </li>
                )}
            </ul>
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-9 cursor-pointer" onClick={toggleMenu}></div>}
        </nav>
    )
}