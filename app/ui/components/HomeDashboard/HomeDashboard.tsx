import CardLink from "../CardLink/CardLink";

export default function HomeDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            <CardLink colspan="col-span-2" />
            <CardLink />
            <CardLink />
            <CardLink />
            <CardLink />
        </div>
    )
}