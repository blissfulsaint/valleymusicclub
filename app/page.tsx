import { Metadata } from "next";
import Hero from "./ui/components/Hero/Hero";
import LayoutBand from "./ui/components/layout/LayoutBand/LayoutBand";
import HomeDashboard from "./ui/components/HomeDashboard/HomeDashboard";

export const metadata: Metadata = {
  title: 'Home | Valley Music Club',
}

export default function Home() {
  return (
    <>
      <Hero imgSrc="/phoenix01.jpg" />
      <LayoutBand>
        <HomeDashboard />
      </LayoutBand>
    </>
  );
}
