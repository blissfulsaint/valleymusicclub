'use client';

import { useActionState, useEffect } from "react"
import { Separator, StatusMessage } from "blisskit-ui";
import { authenticateUser, AuthState } from "@/app/lib/actions/auth";
import Form from "@/app/ui/components/vmc-form/Form/Form"
import OutlineFieldset from "../../vmc-form/OutlineFieldset/OutlineFieldset";
import OutlineFieldsetLegend from "../../vmc-form/OutlineFieldsetLegend/OutlineFieldsetLegend";
import InputContainer from "../../vmc-form/InputContainer/InputContainer";
import OutlineInput from "../../vmc-form/Input/Input";
import FormButton from "../../vmc-form/FormButton/FormButton";
import PageLink from "../../PageLink/PageLink";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const initialState: AuthState = { message: {status: 'none', text: ''}, errors: {}}
    const [state, formAction, isPending] = useActionState(
        authenticateUser,
        initialState,
    );
    const { refreshAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (state.message.status === 'success') {
            console.log('Logged in successfully, refreshing auth...');
            refreshAuth();

            router.push('/account');
        }
    }, [state.message.status, refreshAuth, router])

    return (
        <>
            <Separator size="sm" />
            <Form action={formAction}>
                <OutlineFieldset>
                    <OutlineFieldsetLegend>Login to Valley Music Club</OutlineFieldsetLegend>
                    <div id="form-error" aria-live="polite" aria-atomic="true">
                        {state.message.text && (
                            <StatusMessage status={state.message.status} key={state.message.text}>
                                {state.message.text}
                            </StatusMessage>
                        )}
                    </div>
                    <InputContainer>
                        <label htmlFor="email">Email</label>
                        <OutlineInput 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="johnsmith@example.com"
                            aria-describedby="email-error"
                        />
                        <div id="email-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.email &&
                                state.errors.email.map((error: string) => (
                                    <StatusMessage status="error" key={error}>
                                        {error}
                                    </StatusMessage>
                                ))
                            }
                        </div>
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="password">Password</label>
                        <OutlineInput 
                            type="password"
                            id="password"
                            name="password"
                            aria-describedby="email-error"
                        />
                        <div id="password-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.password &&
                                state.errors.password.map((error: string) => (
                                    <StatusMessage status="error" key={error}>
                                        {error}
                                    </StatusMessage>
                                ))
                            }
                        </div>
                        <PageLink href='/forgot-password' className="mx-auto">Forgot your password? Reset it here!</PageLink>
                    </InputContainer>
                    <FormButton type="submit" disabled={isPending}>Login</FormButton>
                    <PageLink href='/create-account' className="mx-auto">Don&#39;t have an account? Create one here!</PageLink>
                </OutlineFieldset>
            </Form>
        </>
    )
}