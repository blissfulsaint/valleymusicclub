'use client';
import { LayoutBand } from "blisskit-ui";
import Hero from "../ui/components/Hero/Hero";
import { Separator } from "blisskit-ui";
import PageLink from "../ui/components/PageLink/PageLink";
import { useAuth } from "../context/AuthContext";

export default function Events() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <Hero imgSrc="/girl-violin-stock-1.jpg" title="Events" />
            <LayoutBand>
                <Separator />
                <p>This page will soon be filled with events sponsored by the Valley Music Club, the Arizona State Federation of Music Club, and the National Federation of Music Club and will include competitions, recitals, workshops, festivals, concerts, and community events.</p>
                <p>For questions or more information, please contact Tiffani Smith at <PageLink href='mailto:valleymusicclubaz@gmail.com' className="inline">valleymusicclubaz@gmail.com</PageLink>, or call/text 801-450-4760.</p>
                {isAuthenticated ? (
                    <PageLink button href='/account'>View My Account</PageLink>
                ) : (
                    <PageLink button href='/create-account'>Join Our Club</PageLink>
                )}
            </LayoutBand>
        </>
    )
}