import { Metadata } from "next"
import LayoutBand from "@/app/ui/components/layout/LayoutBand/LayoutBand"
import LoginForm from "@/app/ui/components/account/LoginForm/LoginForm"

export const metadata: Metadata = {
    title: 'Login',
}

export default function Login() {
    return (
        <LayoutBand>
            <LoginForm></LoginForm>
        </LayoutBand>
    )
}