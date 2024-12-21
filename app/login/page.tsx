import { Metadata } from "next"
import LayoutBand from "../ui/components/layout/LayoutBand/LayoutBand"

export const metadata: Metadata = {
    title: 'Login',
}

export default function Login() {
    return (
        <LayoutBand>
            <h1>This is the Login Page!</h1>
        </LayoutBand>
    )
}