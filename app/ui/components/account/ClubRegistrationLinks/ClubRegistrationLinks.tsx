import { getCurrentTerm } from "@/app/lib/utils/term";
import { Term } from "@/app/lib/db/definitions";
import ClientLogger from "../../test/ClientLogger/ClientLogger";

export default async function ClubRegistrationLinks() {
    console.log("Getting current term...");
    const currentTerm: Term | null = await getCurrentTerm();
    console.log("Term data received: " + currentTerm);
  
    return (
        <>
            <ClientLogger term={currentTerm} />
            <p>In time, you will be able to access links to register and pay necessary dues to Valley Music Club right here!</p>
            {currentTerm?.school_year ? (
                <p>{currentTerm.school_year}</p>
            ) : (
                <p>No term found</p>
            )}
        </>
    );
}