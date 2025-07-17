import { getClubDuesByTerm } from "@/app/lib/utils/clubDues";
import type { ClubDues } from "@/app/lib/db/definitions";

interface ClubDuesListProps {
    termId: string;
}

export default async function ClubDuesList({
    termId
}: ClubDuesListProps) {
    const clubDuesList: ClubDues[] | null = await getClubDuesByTerm(termId);

    if (!clubDuesList) {
        return <></>
    }

    return (
        <p>This is the ClubDuesList component! Club dues amount: ${clubDuesList[0].dues}</p>
    )
}