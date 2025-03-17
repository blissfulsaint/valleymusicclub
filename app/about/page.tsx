'use client';
import { LayoutBand } from "blisskit-ui"
import Hero from "../ui/components/Hero/Hero"
import { Separator } from "blisskit-ui";
import PageLink from "../ui/components/PageLink/PageLink";
import { useAuth } from "../context/AuthContext";

export default function About() {
    const { isAuthenticated } = useAuth();
    return (
        <>
            <Hero title="About Us" imgSrc="/teachergroup1.jpeg" />
            <LayoutBand>
                <Separator />
                <p>Come and discover the opportunities available through the Valley Music Club!</p>
                <p>As a club member, you will also join the Arizona State and National Federation of Music Clubs, a community of teachers, students, and music enthusiasts. Together, we offer opportunities for musicians of all ages and levels to participate in competitions, recitals, workshops, festivals, concerts, and community events that encourage and support the development of musical skills and instill in our musicians a love and appreciation for music of all styles and genres.</p>
                {isAuthenticated ? (
                    <PageLink button href='/account'>View My Account</PageLink>
                ) : (
                    <PageLink button href='/create-account'>Join Our Club</PageLink>
                )}
            </LayoutBand>
        </>
    )
}