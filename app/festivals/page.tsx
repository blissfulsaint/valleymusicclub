'use client';
import { LayoutBand, Separator } from "blisskit-ui";
import Hero from "../ui/components/Hero/Hero";
import PageLink from "../ui/components/PageLink/PageLink";
import { useAuth } from "../context/AuthContext";

export default function Festivals() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <Hero imgSrc="/orchestra-conductor-stock-1.jpg" title="Music Festivals" />
            <LayoutBand>
                <Separator />
                <p>The NFMC Festivals Program is sponsored by the Valley Music Club. This annual festival provides the opportunity for musicians of all ages and skill levels to participate in a student-friendly, encouraging atmosphere.</p>
                <p>The Festival provides a non-competitive environment for students to perform in solo or ensemble categories, from pre-reading to advanced levels across multiple musical disciplines.</p>
                <p>With participation, students receive certificates, ribbons, and earn points towards Gold Cup Trophies. Participation in this event will encourage musical development and an increased appreciation of American and international composers, and a wide range of musical styles and genres.</p>

                <h2>Phoenix Valley Music Festival</h2>
                <div className="flex flex-wrap gap-5 mb-16">
                    <div>                    
                        <p>Date: Saturday, March 1st</p>
                        <p>Location: 22405 North Miller Road, Scottsdale, AZ 85255</p>
                        <div className="flex flex-wrap gap-5">
                            <PageLink 
                                className="bg-blue-500 hover:text-blue-500"
                                href="https://www.google.com/maps/dir//22405+N+Miller+Rd,+Scottsdale,+AZ+85255/@33.6899413,-111.9162583,16z/data=!4m18!1m8!3m7!1s0x872b77033451d375:0x97289f63fa6df3ca!2s22405+N+Miller+Rd,+Scottsdale,+AZ+85255!3b1!8m2!3d33.6899413!4d-111.9162583!16s%2Fg%2F11bw3_3x6d!4m8!1m0!1m5!1m1!1s0x872b77033451d375:0x97289f63fa6df3ca!2m2!1d-111.9162583!2d33.6899413!3e3?entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D"
                                button
                            >
                                Google Maps
                            </PageLink>
                            <PageLink 
                                className="bg-blue-500 hover:text-blue-500"
                                href="https://maps.apple.com/?daddr=33.690013,-111.916280"
                                button
                            >
                                Apple Maps
                            </PageLink>
                        </div>
                    </div>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6639.468766989031!2d-111.91625830000001!3d33.6899413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b77033451d375%3A0x97289f63fa6df3ca!2s22405%20N%20Miller%20Rd%2C%20Scottsdale%2C%20AZ%2085255!5e0!3m2!1sen!2sus!4v1731988137845!5m2!1sen!2sus" 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="flex-grow"
                    />
                </div>
                {isAuthenticated ? (
                    <PageLink button href='/account'>View My Account</PageLink>
                ) : (
                    <PageLink button href='/create-account'>Join Our Club</PageLink>
                )}
            </LayoutBand>
        </>
    )
}