import { Metadata } from "next"
import { LayoutBand } from "blisskit-ui"

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