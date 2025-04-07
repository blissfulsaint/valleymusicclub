import { LayoutBand } from "blisskit-ui";
import { Suspense } from "react";

import PageLink from "../ui/components/PageLink/PageLink";
import WelcomeBanner from "../ui/components/account/WelcomeBanner/WelcomeBanner";
import ClubRegistrationLinks from "../ui/components/account/ClubRegistrationLinks/ClubRegistrationLinks";
import ClubRegistrationLinksSkeleton from "../ui/components/skeleton/ClubRegistrationLinksSkeleton";

export default function AccountHome() {
    return (
        <LayoutBand>
            <WelcomeBanner />

            <Suspense fallback={<ClubRegistrationLinksSkeleton />} >
                <ClubRegistrationLinks />
            </Suspense>
            
            <PageLink href='/account/settings'>Account Settings</PageLink>
        </LayoutBand>
    )
}