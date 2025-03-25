'use client';

import { useActionState, useEffect, useState } from "react"
import { StatusMessage } from "blisskit-ui";
import { updateUser, AuthState } from "@/app/lib/actions/auth";
import { useAuth } from "@/app/context/AuthContext";

import Form from "@/app/ui/components/vmc-form/Form/Form"
import OutlineFieldset from "../../vmc-form/OutlineFieldset/OutlineFieldset";
import OutlineFieldsetLegend from "../../vmc-form/OutlineFieldsetLegend/OutlineFieldsetLegend";
import InputContainer from "../../vmc-form/InputContainer/InputContainer";
import OutlineInput from "../../vmc-form/Input/Input";
import FormButton from "../../vmc-form/FormButton/FormButton";

export default function UpdateUserForm() {
    const { refreshAuth, user } = useAuth();

    const initialState: AuthState = { message: { status: "none", text: "" }, errors: {} };
    const [state, formAction, isPending] = useActionState(updateUser, initialState);

    // Store original user data
    const [formData, setFormData] = useState({
        first_name: user?.first_name || "",
        middle_name: user?.middle_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || "",
                middle_name: user.middle_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                phone: user.phone || "",
            });
        }
    }, [user]);

    // Track whether the form is changed
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (state.message.status === "success") {
            console.log("Account updated successfully, refreshing auth...");
            refreshAuth();
        }
    }, [state.message.status]);

    // Check if form data has changed compared to the original user data
    useEffect(() => {
        const hasChanges =
            formData.first_name !== (user?.first_name || "") ||
            formData.middle_name !== (user?.middle_name || "") ||
            formData.last_name !== (user?.last_name || "") ||
            formData.email !== (user?.email || "") ||
            formData.phone !== (user?.phone || "");

        setIsChanged(hasChanges);
    }, [formData, user]);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Form action={formAction}>
            <OutlineFieldset className="ml-0">
                <OutlineFieldsetLegend>Update Account Information</OutlineFieldsetLegend>
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
                        type="text"
                        value={formData.first_name}
                        onChange={handleChange}
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
                        type="text"
                        value={formData.middle_name}
                        onChange={handleChange}
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
                        type="text"
                        value={formData.last_name}
                        onChange={handleChange}
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
                        value={formData.email}
                        onChange={handleChange}
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
                    <label htmlFor="phone">Phone Number</label>
                    <OutlineInput 
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
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
                <input type="hidden" name="user_id" value={user?.user_id} />
                <FormButton type="submit" disabled={!isChanged} loading={isPending}>Update Account</FormButton>
            </OutlineFieldset>
        </Form>
    )
}
