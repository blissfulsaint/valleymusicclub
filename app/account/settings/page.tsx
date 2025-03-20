import { LayoutBand } from "blisskit-ui"
import PageLink from "@/app/ui/components/PageLink/PageLink"

export default function AccountSettings() {
    return (
        <LayoutBand>
            <h1>Welcome to the Account Settings page!</h1>
            <PageLink href='/account'>Return to Account Home</PageLink>
        </LayoutBand>
    )
}