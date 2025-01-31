import { Metadata } from "next";
import { LayoutBand } from "blisskit-ui";

export const metadata: Metadata = {
    title: 'Account Home'
}

export default function AccountHome() {
    return (
        <LayoutBand>
            <h1>Welcome to the Account Homepage!</h1>
            <p>This page is still in development. Please check back later for more features!</p>
        </LayoutBand>
    )
}