interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    action?: ((payload: FormData) => void) | string;
    children: React.ReactNode;
}

export default function Form({
    action,
    children,
}: FormProps) {
    return (
        <form action={action}>
            {children}
        </form>
    )
}