'use client';

import { useActionState } from "react"
import Form from "@/app/ui/components/Form/Form"
import { createUser } from "@/app/lib/actions/auth"

export default function CreateAccountForm() {
    const [state, formAction, isPending] = useActionState(
        createUser,
        undefined,
    );

    return (
        <Form action={formAction}>
            <p>This is the Create Account form!</p>
        </Form>
    )
}