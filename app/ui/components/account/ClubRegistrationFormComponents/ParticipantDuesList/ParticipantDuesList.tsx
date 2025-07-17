interface ParticipantDuesListProps {
    termId: string;
}

export default async function ParticipantDuesList({
    termId
}: ParticipantDuesListProps) {
    return (
        <p>This is the ParticipantDuesList component! Term ID: {termId}</p>
    )
}