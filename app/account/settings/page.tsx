import { LayoutBand, Separator } from "blisskit-ui"
import PageLink from "@/app/ui/components/PageLink/PageLink"
import UpdatePasswordForm from "@/app/ui/components/account/UpdatePasswordForm/UpdatePasswordForm"
import UpdateUserForm from "@/app/ui/components/account/UpdateUserForm/UpdateUserForm"

export default function AccountSettings() {
    return (
        <LayoutBand>
            <h1>Account Settings</h1>
            <p>Update your email, password, and other personal information related to your account on this page.</p>
            <Separator size="xs" />
            <UpdateUserForm />
            <Separator size="xs" />
            <UpdatePasswordForm />
            <Separator size="xs" />
            <PageLink href='/account'>Return to Account Home</PageLink>
        </LayoutBand>
    )
}