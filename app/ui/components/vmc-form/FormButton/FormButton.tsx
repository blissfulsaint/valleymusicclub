import clsx from "clsx"

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

export default function FormButton({
    children,
    className,
    ...rest
}: FormButtonProps) {
    return (
        <button
            {...rest}
            className={clsx(
                'px-2 py-1 bg-primaryColor text-white w-full rounded-md hover:bg-slate-200 hover:text-primaryColor transition duration 150',
                className
            )}
        >
            {children}
        </button>
    )
}