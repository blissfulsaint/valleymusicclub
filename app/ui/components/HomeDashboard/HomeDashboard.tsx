import CardLink from "../CardLink/CardLink";

export default function HomeDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            <CardLink colspan="md:col-span-2" href="/page-in-development" title="Join Our Club" ariaLabel="Create an Account on ValleyMusicClub.com" imgSrc="/studentgroup.jpeg" />
            <CardLink href="/page-in-development" title="About Us" ariaLabel="Learn more about Valley Music Club" imgSrc="/teachergroup1.jpeg" />
            <CardLink href="/page-in-development" title="Events" ariaLabel="View details of upcoming Valley Music Club events" imgSrc="/teachergroup3.jpeg" />
            <CardLink href="/page-in-development" title="Music Festivals" ariaLabel="Learn about VMC Music Festivals" imgSrc="/student1.jpeg" />
            <CardLink href="/page-in-development" title="Competitions and Awards" ariaLabel="View results and other details about Competitions" imgSrc="/teachergroup2.jpeg" />
        </div>
    )
}