interface FormProps {
    action: any;
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