'use client';

import { useActionState } from "react"
import Form from "@/app/ui/components/Form/Form"
import { authenticateUser, AuthState } from "@/app/lib/actions/auth";

export default function LoginForm() {
    const initialState: AuthState = { message: '', errors: {}}
    const [state, formAction, isPending] = useActionState(
        authenticateUser,
        initialState,
    );

    return (
        <Form action={formAction}>
            <fieldset className="rounded-xl border-solid border-2 border-primaryColor max-w-lg p-4 m-auto">
                <legend className="px-2 text-lg text-primaryColor">Login</legend>
                <div id="form-error" aria-live="polite" aria-atomic="true">
                    {state.message && (
                        <p className="mt-2 text-sm text-red-500" key="Form Error">
                            {state.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="johnsmith@example.com"
                        className="block"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        className="block"
                        required
                    />
                </div>
                <button type="submit" disabled={isPending}>Login</button>
            </fieldset>
        </Form>
    )
}