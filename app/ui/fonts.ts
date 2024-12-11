import { Playfair } from "next/font/google";
import { Roboto } from "next/font/google";

export const playfair = Playfair({ subsets: ['latin'] })
export const roboto = Roboto({
    subsets: ['latin'],
    weight: '400',
})