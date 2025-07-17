interface VoluntaryDuesListProps {
    termId: string;
}

export default async function VoluntaryDuesList({
    termId
}: VoluntaryDuesListProps) {
    return (
        <p>This is the VoluntaryDuesList component! Term ID: {termId}</p>
    )
}