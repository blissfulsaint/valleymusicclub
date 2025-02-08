'use client';

import { Separator } from "blisskit-ui";
// import { useState } from "react";
import Form from "../../vmc-form/Form/Form";
import OutlineFieldset from "../../vmc-form/OutlineFieldset/OutlineFieldset";
import OutlineFieldsetLegend from "../../vmc-form/OutlineFieldsetLegend/OutlineFieldsetLegend";
import InputContainer from "../../vmc-form/InputContainer/InputContainer";
import OutlineInput from "../../vmc-form/Input/Input";
import FormButton from "../../vmc-form/FormButton/FormButton";
import StatusMessage from "../../vmc-form/StatusMessage/StatusMessage";
import PageLink from "../../PageLink/PageLink";

export default function ForgotPasswordForm() {
    // const [isPending, setIsPending] = useState(false);

    // async function emailTest() {
    //     try {
    //         await fetch('/api/email/send', {
    //             method: 'POST'
    //         })
    //     }
    // }

    return (
        <>
            <Separator size="sm" />
            <Form action={''}>
                <OutlineFieldset>
                    <OutlineFieldsetLegend>Reset Password</OutlineFieldsetLegend>
                    <InputContainer>
                        <label htmlFor="email">Email</label>
                        <OutlineInput 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="johnsmith@example.com"
                            aria-describedby="email-error"
                        />
                        {/* Add state.error logic */}
                        <StatusMessage status="error">
                            Sample Error Message
                        </StatusMessage>
                    </InputContainer>
                    <FormButton type="submit">Send Password Reset Link</FormButton>
                    <PageLink href='/login' className="mx-auto">Return to Login</PageLink>
                </OutlineFieldset>
            </Form>
        </>
    )
}