'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StatusMessage from "@/app/ui/components/vmc-form/StatusMessage/StatusMessage";
import Form from "@/app/ui/components/vmc-form/Form/Form";
import FormButton from "@/app/ui/components/vmc-form/FormButton/FormButton";
import OutlineInput from "@/app/ui/components/vmc-form/Input/Input";
import InputContainer from "@/app/ui/components/vmc-form/InputContainer/InputContainer";
import OutlineFieldset from "@/app/ui/components/vmc-form/OutlineFieldset/OutlineFieldset";
import OutlineFieldsetLegend from "@/app/ui/components/vmc-form/OutlineFieldsetLegend/OutlineFieldsetLegend";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        async function validateToken() {
            const res = await fetch(`/api/auth/validate-token?token=${token}`);
            const data = await res.json();
            if (!res.ok) {
                setError(data.error);
            } else {
                setIsValid(true);
            }
        }

        if (token) {
            validateToken();
        } else {
            setError('No token provided.');
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({ token, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.error);
        } else {
            alert('Password reset successful! Redirecting to login...');
            router.push('/login');
        }
    };

    if (error) {
        return <StatusMessage status="error">{error}</StatusMessage>
    }

    if (!isValid) {
        return <div>Validating token...</div>;
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <OutlineFieldset>
                    <OutlineFieldsetLegend>Reset Password</OutlineFieldsetLegend>
                    <InputContainer>
                        <label htmlFor="new-password">New Password</label>
                        <OutlineInput 
                            type="password"
                            name="new-password"
                            id="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </InputContainer>

                    <InputContainer>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <OutlineInput
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </InputContainer>

                    <FormButton type="submit">Reset Password</FormButton>
                </OutlineFieldset>
            </Form>
        </>
    )
}