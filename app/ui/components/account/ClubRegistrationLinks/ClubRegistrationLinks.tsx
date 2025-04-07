import { getTestData } from "@/app/lib/utils/test";

export default async function ClubRegistrationLinks() {
    const message = await getTestData();
  
    return <p>{message}</p>;
  }