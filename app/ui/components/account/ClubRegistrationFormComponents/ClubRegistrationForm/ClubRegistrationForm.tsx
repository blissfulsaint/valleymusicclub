import ClubDuesList from "../ClubDuesList/ClubDuesList"
import ParticipantDuesList from "../ParticipantDuesList/ParticipantDuesList";
import type { Term } from "@/app/lib/db/definitions"
import { getOpenRegistrationTerm } from "@/app/lib/utils/term"
import VoluntaryDuesList from "../VoluntaryDuesList/VoluntaryDuesList";

export default async function ClubRegistrationForm() {

    const currentTerm: Term | null = await getOpenRegistrationTerm();

    if (!currentTerm) {
        return (
            <>
                <h1>No Open Registration Available</h1>
                <p>We&apos;re sorry, we couldn&apos;t find an open registration period. It&apos;s possible registration may not yet be open, or the registration period already closed. Please check back here later!</p>
            </>
        )
    }

    return (
        <>
            <p>This is the ClubRegistrationForm</p>
            <ClubDuesList termId={currentTerm.term_id} />
            <ParticipantDuesList termId={currentTerm.term_id} />
            <VoluntaryDuesList termId={currentTerm.term_id} />
        </>
    )
}