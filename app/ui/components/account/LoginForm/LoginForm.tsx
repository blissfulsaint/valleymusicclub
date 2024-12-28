'use client';

import { useActionState } from "react"
import Form from "@/app/ui/components/Form/Form"
import { authenticateUser, AuthState } from "@/app/lib/actions/auth";

export default function LoginForm() {
    const initialState: AuthState = { message: null, errors: {}}
    const [state, formAction, isPending] = useActionState(
        authenticateUser,
        initialState,
    );

    return (
        <Form action={formAction}>
            <p>This is the Login form!</p>
        </Form>
    )
}