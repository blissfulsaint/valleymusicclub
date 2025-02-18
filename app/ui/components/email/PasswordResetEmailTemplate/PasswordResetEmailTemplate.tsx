import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
}

export default function PasswordResetEmailTemplate({
    firstName,
}: EmailTemplateProps) {
    return (
        <div>
            <h1>Hello, {firstName}!</h1>
            <p><strong>***ATTENTION*** This is a testing email and the link below will take you to the home page of the current deployment of the Valley Music Club website which is still in active development.</strong></p>
            <p>We received a request to reset your password at <strong>ValleyMusicClub.com</strong>. Click the button below to reset your password:</p>
            <a href='https://valleymusicclub.vercel.app' target='_blank'>Reset Password</a>
            <p>If you did not request this, you can safely ignore this email. No changes have been made to your account.</p>
            <p>Best, <br />The Valley Music Club Team</p>
        </div>
    )
}