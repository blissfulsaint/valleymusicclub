import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
}

export default function PasswordResetEmailTemplate({
    firstName,
}: EmailTemplateProps) {
    return (
        <div>
            <h1>Welcome, {firstName}!</h1>
        </div>
    )
}