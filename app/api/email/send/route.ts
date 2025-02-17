import PasswordResetEmailTemplate from "@/app/ui/components/email/PasswordResetEmailTemplate/PasswordResetEmailTemplate";
import { Resend } from "resend";
import { getUserByEmail } from "@/app/lib/actions/user";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return Response.json({ error: 'Email is required' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from : 'Acme <onboarding@resend.dev>',
            to: [email],
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