import PasswordResetEmailTemplate from "@/app/ui/components/email/PasswordResetEmailTemplate/PasswordResetEmailTemplate";
import { Resend } from "resend";
import { getUserByEmail } from "@/app/lib/actions/user";
import { insertPasswordRecoveryToken } from "@/app/lib/actions/user";
import crypto from 'crypto';

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
            const token = crypto.randomBytes(32).toString('hex');
            const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

            await insertPasswordRecoveryToken(user.user_id, token, expiresAt);

            const resetLink = `https://valleymusicclub.vercel.app/reset-password?token=${token}`;
            
            await resend.emails.send({
                from : 'Valley Music Club <password-reset@valleymusicclub.com>',
                to: [user.email],
                subject: 'Reset VMC Password',
                react: PasswordResetEmailTemplate({ firstName: user.first_name, resetLink: resetLink }),
            });
        }

        return Response.json({ message: 'If an account exists, a reset email has been sent.' }, { status: 200 })
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}