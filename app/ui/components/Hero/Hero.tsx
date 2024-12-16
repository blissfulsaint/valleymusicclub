'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from './Hero.module.scss';

export default function Hero() {
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={styles.hero}>
            <div
                style={{
                    transform: `translateY(${offsetY * 0.5}px)`,
                }}
            ></div>
            <h1>Welcome to Valley Music Club!</h1>
        </div>
    );
}