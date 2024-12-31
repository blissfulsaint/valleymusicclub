'use client';

import { useActionState } from "react"
import Form from "@/app/ui/components/Form/Form"
import Separator from "../../layout/Separator/Separator";
import Link from "next/link";
import { authenticateUser, AuthState } from "@/app/lib/actions/auth";

export default function LoginForm() {
    const initialState: AuthState = { message: '', errors: {}}
    const [state, formAction, isPending] = useActionState(
        authenticateUser,
        initialState,
    );

    return (
        <>
            <Separator size="sm" />
            <Form action={formAction}>
                <fieldset className="rounded-xl border-solid border-2 border-primarySecondary max-w-md p-4 m-auto">
                    <legend className="px-2 text-lg text-primarySecondary">Login to Valley Music Club</legend>
                    <div id="form-error" aria-live="polite" aria-atomic="true">
                        {state.message && (
                            <p className="p-0 my-1 text-sm text-red-500" key={state.message}>
                                {state.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="johnsmith@example.com"
                            className="block border border-primarySecondary rounded-md px-2 py-1 w-full bg-background"
                            // required
                            aria-describedby="email-error"
                        />
                        <div id="email-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.email &&
                                state.errors.email.map((error: string) => (
                                    <p className="p-0 my-1 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            className="block border border-primarySecondary rounded-md px-2 py-1 w-full bg-background"
                            // required
                            aria-describedby="email-error"
                        />
                        <div id="password-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.password &&
                                state.errors.password.map((error: string) => (
                                    <p className="p-0 my-1 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="px-2 py-1 bg-primaryColor text-white w-full rounded-md hover:bg-slate-200 hover:text-primaryColor transition duration 150"
                        disabled={isPending}
                    >
                        Login
                    </button>
                    <Link className="text-accent1 block w-fit mx-auto mt-1 hover:underline" href='/account/create-account'>Don&#39;t have an account? Create one here!</Link>
                </fieldset>
            </Form>
        </>
    )
}