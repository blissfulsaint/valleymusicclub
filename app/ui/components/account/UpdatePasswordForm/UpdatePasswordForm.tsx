'use client';
import React, { useState } from "react";
import { StatusMessage } from "blisskit-ui";

import Form from "../../vmc-form/Form/Form"
import OutlineFieldset from "../../vmc-form/OutlineFieldset/OutlineFieldset"
import OutlineFieldsetLegend from "../../vmc-form/OutlineFieldsetLegend/OutlineFieldsetLegend"
import InputContainer from "../../vmc-form/InputContainer/InputContainer"
import OutlineInput from "../../vmc-form/Input/Input"
import FormButton from "../../vmc-form/FormButton/FormButton"

type StatusState = { status: "success" | "error"; message: string } | null;

export default function UpdatePasswordForm() {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        
    }

    return (
        <Form onSubmit={handleSubmit}>
            <OutlineFieldset>
                <OutlineFieldsetLegend>Update Password</OutlineFieldsetLegend>
                <InputContainer>
                    <label htmlFor="old-password">Old Password</label>
                    <OutlineInput 
                        type="password"
                        name="old-password"
                        id="old-password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="new-password">New Password</label>
                    <OutlineInput 
                        type="password"
                        name="new-password"
                        id="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="confirm-password">Confirm New Password</label>
                    <OutlineInput
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </InputContainer>

                <FormButton type="submit">Update Password</FormButton>
            </OutlineFieldset>
        </Form>
    )
}