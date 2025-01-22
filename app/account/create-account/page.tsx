import { Metadata } from "next"
import { LayoutBand } from "blisskit-ui"
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