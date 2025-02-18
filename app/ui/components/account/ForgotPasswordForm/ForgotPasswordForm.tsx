'use client';

import { Separator } from "blisskit-ui";
import { useState } from "react";
import Form from "../../vmc-form/Form/Form";
import OutlineFieldset from "../../vmc-form/OutlineFieldset/OutlineFieldset";
import OutlineFieldsetLegend from "../../vmc-form/OutlineFieldsetLegend/OutlineFieldsetLegend";
import InputContainer from "../../vmc-form/InputContainer/InputContainer";
import OutlineInput from "../../vmc-form/Input/Input";
import FormButton from "../../vmc-form/FormButton/FormButton";
import StatusMessage from "../../vmc-form/StatusMessage/StatusMessage";
import PageLink from "../../PageLink/PageLink";

type StatusState = { status: "success" | "error"; message: string } | null;

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<StatusState>(null);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);
        setStatus(null);

        try {
            const response = await fetch("/api/email/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Something went wrong");
            }

            setStatus({ status: "success", message: result.message });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
            setStatus({ status: "error", message: errorMessage });
        } finally {
            setIsPending(false);
        }
    }

    return (
        <>
            <Separator size="sm" />
            <Form onSubmit={handleSubmit}>
                <OutlineFieldset>
                    <OutlineFieldsetLegend>Reset Password</OutlineFieldsetLegend>
                    <InputContainer>
                        <label htmlFor="email">Email</label>
                        <OutlineInput
                            id="email"
                            name="email"
                            type="email"
                            placeholder="johnsmith@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {status?.status === "error" && (
                            <StatusMessage status="error">{status.message}</StatusMessage>
                        )}
                    </InputContainer>
                    <FormButton type="submit" disabled={isPending}>
                        {isPending ? "Sending..." : "Send Password Reset Link"}
                    </FormButton>
                    {status?.status === "success" && (
                        <StatusMessage status="success">{status.message}</StatusMessage>
                    )}
                    <PageLink href="/login" className="mx-auto">
                        Return to Login
                    </PageLink>
                </OutlineFieldset>
            </Form>
        </>
    );
}
