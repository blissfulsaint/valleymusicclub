'use client';

import { useActionState } from "react"
import Form from "@/app/ui/components/vmc-form/Form/Form"
import OutlineFieldset from "../../vmc-form/OutlineFieldset/OutlineFieldset";
import OutlineFieldsetLegend from "../../vmc-form/OutlineFieldsetLegend/OutlineFieldsetLegend";
import InputContainer from "../../vmc-form/InputContainer/InputContainer";
import OutlineInput from "../../vmc-form/Input/Input";
import FormButton from "../../vmc-form/FormButton/FormButton";
import StatusMessage from "../../vmc-form/StatusMessage/StatusMessage";
import Separator from "../../layout/Separator/Separator";
import PageLink from "../../PageLink/PageLink";
import { createUser, AuthState } from "@/app/lib/actions/auth";

export default function CreateAccountForm() {
    const initialState: AuthState = { message: {status: 'none', text: ''}, errors: {}}
    const [state, formAction, isPending] = useActionState(
        createUser,
        initialState,
    );

    return (
        <>
            <Separator size="sm" />
            <Form action={formAction}>
                <OutlineFieldset>
                    <OutlineFieldsetLegend>Create an Account with Valley Music Club</OutlineFieldsetLegend>
                    <div id="form-error" aria-live="polite" aria-atomic="true">
                        {state.message.text && (
                            <StatusMessage status={state.message.status} key={state.message.text}>
                                {state.message.text}
                            </StatusMessage>
                        )}
                    </div>
                    <InputContainer>
                        <label htmlFor="first_name">First Name*</label>
                        <OutlineInput 
                            id="first_name"
                            name="first_name"
                            type="first_name"
                            placeholder="John"
                            aria-describedby="first_name-error"
                        />
                        <div id="first_name-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.first_name &&
                                state.errors.first_name.map((error: string) => (
                                    <StatusMessage status="error" key={error}>
                                        {error}
                                    </StatusMessage>
                                ))
                            }
                        </div>
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="middle_name">Middle Name</label>
                        <OutlineInput 
                            id="middle_name"
                            name="middle_name"
                            type="middle_name"
                            aria-describedby="middle_name-error"
                        />
                        <div id="email-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.middle_name &&
                                state.errors.middle_name.map((error: string) => (
                                    <StatusMessage status="error" key={error}>
                                        {error}
                                    </StatusMessage>
                                ))
                            }
                        </div>
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="last_name">Last Name*</label>
                        <OutlineInput 
                            id="last_name"
                            name="last_name"
                            type="last_name"
                            placeholder="Smith"
                            aria-describedby="last_name-error"
                        />
                        <div id="last_name-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.last_name &&
                                state.errors.last_name.map((error: string) => (
                                    <StatusMessage status="error" key={error}>
                                        {error}
                                    </StatusMessage>
                                ))
                            }
                        </div>
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="email">Email*</label>
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
                        <label htmlFor="password">Password*</label>
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
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="phone">Phone Number</label>
                        <OutlineInput 
                            type="phone"
                            id="phone"
                            name="phone"
                            aria-describedby="phone-error"
                        />
                        <div id="phone-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.phone &&
                                state.errors.phone.map((error: string) => (
                                    <StatusMessage status="error" key={error}>
                                        {error}
                                    </StatusMessage>
                                ))
                            }
                        </div>
                    </InputContainer>
                    <FormButton type="submit" disabled={isPending}>Create Account</FormButton>
                    <PageLink href='/account/login' className="mx-auto">Already have an account? Login here!</PageLink>
                </OutlineFieldset>
            </Form>
        </>
    )
}