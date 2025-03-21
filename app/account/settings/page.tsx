import { LayoutBand } from "blisskit-ui"
import PageLink from "@/app/ui/components/PageLink/PageLink"
import UpdatePasswordForm from "@/app/ui/components/account/UpdatePasswordForm/UpdatePasswordForm"

export default function AccountSettings() {
    return (
        <LayoutBand>
            <h1>Account Settings</h1>
            <p>Update your email, password, and other personal information related to your account on this page.</p>
            <UpdatePasswordForm />
            <PageLink href='/account'>Return to Account Home</PageLink>
        </LayoutBand>
    )
}