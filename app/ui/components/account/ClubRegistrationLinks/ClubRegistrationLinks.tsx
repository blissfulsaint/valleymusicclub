import { getTestData } from "@/app/lib/utils/test";

export default async function ClubRegistrationLinks() {
    console.log("Getting test data...");
    const message = await getTestData();
    console.log("Test data received: " + message);
  
    return <p>{message}</p>;
  }