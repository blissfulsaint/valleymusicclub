import CardLink from "../CardLink/CardLink";

export default function HomeDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            <CardLink colspan="md:col-span-2" href="#" title="Join Our Club" />
            <CardLink href="#" title="About Us" />
            <CardLink href="#" title="Events"/>
            <CardLink href="#" title="Music Festivals"/>
            <CardLink href="#" title="Competitions and Awards"/>
        </div>
    )
}