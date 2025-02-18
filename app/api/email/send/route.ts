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

        const user = await getUserByEmail(email);

        if (user) {
            await resend.emails.send({
                from : 'Valley Music Club <password-reset@valleymusicclub.com>',
                to: [user.email],
                subject: 'Reset VMC Password',
                react: PasswordResetEmailTemplate({ firstName: user.first_name }),
            });
        }

        return Response.json({ message: 'If an account exists, a reset email has been sent.' }, { status: 200 })
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}