import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    resetLink: string;
}

export default function PasswordResetEmailTemplate({
    firstName,
    resetLink
}: EmailTemplateProps) {
    return (
        <div>
            <h1>Hello, {firstName}!</h1>
            <p>We received a request to reset your password at <strong>ValleyMusicClub.com</strong>. Click the button below to reset your password:</p>
            <a href={resetLink} target='_blank'>Reset Password</a>
            <p>If you did not request this, you can safely ignore this email. No changes have been made to your account.</p>
            <p>Best, <br />The Valley Music Club Team</p>
        </div>
    )
}