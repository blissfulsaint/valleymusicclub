import { Metadata } from "next"
import LayoutBand from "../ui/components/layout/LayoutBand/LayoutBand"
import Link from "next/link"
import { useActionState } from "react"

export const metadata: Metadata = {
    title: 'Page In Development',
}

export default function PageInDevelopment() {
    return (
        <LayoutBand>
            <h1>Looks like this page isn&#39;t done yet!</h1>
            <p>We are still hard at work developing this page. Please try again later!</p>
            <Link href='/' className="block w-fit"><p className="rounded bg-accent1 w-fit px-4 mx-2 my-4 hover:bg-white hover:text-accent1">Return Home</p></Link>
        </LayoutBand>
    )
}