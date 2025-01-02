import { Metadata } from "next"
import LayoutBand from "@/app/ui/components/layout/LayoutBand/LayoutBand"
import CreateAccountForm from "@/app/ui/components/account/CreateAccountForm/CreateAccountForm"

export const metadata: Metadata = {
    title: 'Create an Account',
}

export default function CreateAccount() {
    return (
        <LayoutBand>
            <CreateAccountForm></CreateAccountForm>
        </LayoutBand>
    )
}