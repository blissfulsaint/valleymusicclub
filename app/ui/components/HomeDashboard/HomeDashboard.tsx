import CardLink from "../CardLink/CardLink";

export default function HomeDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            <CardLink colspan="md:col-span-2" href="#" title="Join Our Club" imgSrc="/studentgroup.jpeg" />
            <CardLink href="#" title="About Us" imgSrc="/teachergroup1.jpeg" />
            <CardLink href="#" title="Events" imgSrc="/teachergroup3.jpeg" />
            <CardLink href="#" title="Music Festivals" imgSrc="/student1.jpeg" />
            <CardLink href="#" title="Competitions and Awards" imgSrc="/teachergroup2.jpeg" />
        </div>
    )
}