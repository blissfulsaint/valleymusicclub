import { Metadata } from "next"
import { LayoutBand } from "blisskit-ui"
import PageLink from "../ui/components/PageLink/PageLink"

export const metadata: Metadata = {
    title: 'Page In Development',
}

export default function PageInDevelopment() {
    return (
        <LayoutBand>
            <h1>Looks like this page isn&#39;t done yet!</h1>
            <p>We are still hard at work developing this page. Please try again later!</p>
            <PageLink href='/' className="mx-2" button>Return Home</PageLink>
        </LayoutBand>
    )
}