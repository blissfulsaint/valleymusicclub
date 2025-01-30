import { logoutUser } from "../lib/actions/auth";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
    await logoutUser();
    redirect('/');
}