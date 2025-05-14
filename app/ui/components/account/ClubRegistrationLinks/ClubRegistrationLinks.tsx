import { getCurrentTerm } from "@/app/lib/utils/term";
import { Term } from "@/app/lib/db/definitions";

export default async function ClubRegistrationLinks() {
    console.log("Getting current term...");
    const currentTerm: Term | null = await getCurrentTerm();
    console.log("Term data received: " + currentTerm);
  
    return <p>In time, you will be able to access links to register and pay necessary dues to Valley Music Club right here!</p>;
}