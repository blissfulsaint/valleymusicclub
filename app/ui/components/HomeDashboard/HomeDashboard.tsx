'use client';
import { CardLink } from "blisskit-ui";
import { useAuth } from "@/app/context/AuthContext";

export default function HomeDashboard() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            {isAuthenticated ? (
                <CardLink 
                    textClassName="bg-primaryColor" 
                    colspan="md:col-span-2" 
                    href="/account" 
                    title="View My Account" 
                    ariaLabel="View your account dashboard" 
                    imgSrc="/studentgroup.jpeg"
                />
            ) : (
                <CardLink 
                    textClassName="bg-primaryColor" 
                    colspan="md:col-span-2" 
                    href="/create-account" 
                    title="Join Our Club" 
                    ariaLabel="Create an Account on ValleyMusicClub.com" 
                    imgSrc="/studentgroup.jpeg"
                />
            )}
            <CardLink 
                textClassName="bg-primaryColor" 
                href="/about" 
                title="About Us" 
                ariaLabel="Learn more about Valley Music Club" 
                imgSrc="/teachergroup1.jpeg"
            />
            <CardLink 
                textClassName="bg-primaryColor" 
                href="/events" 
                title="Events" 
                ariaLabel="View details of upcoming Valley Music Club events" 
                imgSrc="/girl-violin-stock-1.jpg"
            />
            <CardLink 
                textClassName="bg-primaryColor" 
                href="/page-in-development" 
                title="Music Festivals" 
                ariaLabel="Learn about VMC Music Festivals" 
                imgSrc="/orchestra-conductor-stock-1.jpg" 
            />
            <CardLink 
                textClassName="bg-primaryColor" 
                href="/page-in-development" 
                title="Competitions and Awards" 
                ariaLabel="View results and other details about Competitions" 
                imgSrc="/awards-stock-1.jpg" 
            />
        </div>
    )
}