import { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordClient";

export default function ResetPasswordPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordPage />
        </Suspense>
    )
}