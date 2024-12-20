'use client';
import { useEffect, useState } from "react";
import styles from './Hero.module.scss';
import LayoutBand from "../layout/LayoutBand/LayoutBand";

interface HeroProps {
    imgSrc?: string;
    bgColor?: string;
}

export default function Hero({
    imgSrc,
    bgColor = 'bg-secondaryColor'
}: HeroProps) {
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
                className={`${bgColor}`}
                style={{
                    transform: `translateY(${offsetY * 0.5}px)`,
                    backgroundImage: `url('${imgSrc}')`
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