'use client';
import { useEffect, useState } from "react";
import styles from './Hero.module.scss';
import LayoutBand from "../layout/LayoutBand/LayoutBand";

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
            <div>
                <LayoutBand>
                    <div className="flex flex-col justify-center">
                        <h1>Welcome to Valley Music Club!</h1>
                    </div>
                </LayoutBand>
            </div>
        </div>
    );
}