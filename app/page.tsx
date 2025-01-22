import { Metadata } from "next";
import { LayoutBand } from "blisskit-ui";
import Hero from "./ui/components/Hero/Hero";
import HomeDashboard from "./ui/components/HomeDashboard/HomeDashboard";

export const metadata: Metadata = {
  title: 'Home | Valley Music Club',
}

export default function Home() {
  return (
    <>
      <Hero imgSrc="/phoenix01.jpg" title="Welcome to Valley Music Club!" />
      <LayoutBand>
        <HomeDashboard />
      </LayoutBand>
    </>
  );
}
