'use client';
import React, { useEffect } from "react";
import { useActionState } from "react";
import { StatusMessage } from "blisskit-ui";
import { PasswordState, updatePassword } from "@/app/lib/actions/auth";
import { useAuth } from "@/app/context/AuthContext";

import Form from "../../vmc-form/Form/Form"
import OutlineFieldset from "../../vmc-form/OutlineFieldset/OutlineFieldset"
import OutlineFieldsetLegend from "../../vmc-form/OutlineFieldsetLegend/OutlineFieldsetLegend"
import InputContainer from "../../vmc-form/InputContainer/InputContainer"
import OutlineInput from "../../vmc-form/Input/Input"
import FormButton from "../../vmc-form/FormButton/FormButton"

export default function UpdatePasswordForm() {
    const initialState: PasswordState = { message: {status: 'none', text: ''}, errors: {}}
    const [state, formAction, isPending] = useActionState(
        updatePassword,
        initialState,
    );
    const { refreshAuth } = useAuth();

    useEffect(() => {
        if (state.message.status === 'success') {
            console.log('Password updated successfully, refreshing auth...');
            refreshAuth();
        }
    }, [state.message.status])

    return (
        <Form action={formAction}>
            <OutlineFieldset className="ml-0">
                <OutlineFieldsetLegend>Update Password</OutlineFieldsetLegend>
                    <div id="form-error" aria-live="polite" aria-atomic="true">
                        {state.message.text && (
                            <StatusMessage status={state.message.status} key={state.message.text}>
                                {state.message.text}
                            </StatusMessage>
                        )}
                    </div>
                <InputContainer>
                    <label htmlFor="old-password">Old Password</label>
                    <OutlineInput 
                        type="password"
                        name="old-password"
                        id="old-password"
                        aria-describedby="old-password-error"
                        required
                    />
                    <div id="old-password-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.oldPassword &&
                            state.errors.oldPassword.map((error: string) => (
                                <StatusMessage status="error" key={error}>
                                    {error}
                                </StatusMessage>
                            ))
                        }
                    </div>
                </InputContainer>

                <InputContainer>
                    <label htmlFor="new-password">New Password</label>
                    <OutlineInput 
                        type="password"
                        name="new-password"
                        id="new-password"
                        aria-describedby="new-password-error"
                        required
                    />
                    <div id="new-password-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.newPassword &&
                            state.errors.newPassword.map((error: string) => (
                                <StatusMessage status="error" key={error}>
                                    {error}
                                </StatusMessage>
                            ))
                        }
                    </div>
                </InputContainer>

                <InputContainer>
                    <label htmlFor="confirm-password">Confirm New Password</label>
                    <OutlineInput
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        aria-describedby="confirm-password-error"
                        required
                    />
                    <div id="confirm-password-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.confirmNewPassword &&
                            state.errors.confirmNewPassword.map((error: string) => (
                                <StatusMessage status="error" key={error}>
                                    {error}
                                </StatusMessage>
                            ))
                        }
                    </div>
                </InputContainer>

                <FormButton type="submit" loading={isPending}>Update Password</FormButton>
            </OutlineFieldset>
        </Form>
    )
}