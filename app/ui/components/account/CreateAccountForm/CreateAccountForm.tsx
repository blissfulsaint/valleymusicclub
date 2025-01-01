'use client';

// import { useActionState } from "react"
import Form from "@/app/ui/components/vmc-form/Form/Form"
// import { createUser, AuthState } from "@/app/lib/actions/auth"

export default function CreateAccountForm() {
    // const initialState: AuthState = { message: '', errors: {}}
    // const [state, formAction, isPending] = useActionState(
    //     createUser,
    //     initialState,
    // );

    return (
        <Form action='/'>
            {/* <div id="form-error" aria-live="polite" aria-atomic="true">
                {state.message && (
                    <p className="mt-2 text-sm text-red-500" key="Form Error">
                        {state.message}
                    </p>
                )}
            </div> */}
            <p>This is the Create Account form!</p>
        </Form>
    )
}