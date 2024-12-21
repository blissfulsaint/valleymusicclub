'use client';
import { useEffect, useState } from "react";
import styles from './Hero.module.scss';
import LayoutBand from "../layout/LayoutBand/LayoutBand";

interface HeroProps {
    imgSrc?: string;
    title: string;
    twClassName?: string;
}

export default function Hero({
    imgSrc,
    title,
    twClassName,
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
                className={`bg-secondaryColor ${twClassName}`}
                style={{
                    transform: `translateY(${offsetY * 0.5}px)`,
                    backgroundImage: `url('${imgSrc}')`
                }}
            ></div>
            <div>
                <LayoutBand>
                    <div className="flex flex-col justify-center">
                        <h1 className="m-0">{title}</h1>
                    </div>
                </LayoutBand>
            </div>
        </div>
    );
}