import PasswordResetEmailTemplate from "@/app/ui/components/email/PasswordResetEmailTemplate/PasswordResetEmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
        const { data, error } = await resend.emails.send({
            from : 'Acme <onboarding@resend.dev>',
            to: ['blissfulsaint99@gmail.com'],
            subject: 'Hello world',
            react: PasswordResetEmailTemplate({ firstName: 'Brandon' }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}