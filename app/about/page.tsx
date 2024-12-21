import { Metadata } from "next"
import LayoutBand from "../ui/components/layout/LayoutBand/LayoutBand"

export const metadata: Metadata = {
    title: 'About Us',
}

export default function About() {
    return (
        <LayoutBand>
            <h1>This is the About Page!</h1>
        </LayoutBand>
    )
}