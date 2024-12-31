'use client';
import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from './Hero.module.scss';
import LayoutBand from "../layout/LayoutBand/LayoutBand";

interface HeroProps {
    imgSrc?: string;
    title: string;
    className?: string;
}

export default function Hero({
    imgSrc,
    title,
    className,
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
                className={clsx(
                    'bg-secondaryColor',
                    className,
                )}
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