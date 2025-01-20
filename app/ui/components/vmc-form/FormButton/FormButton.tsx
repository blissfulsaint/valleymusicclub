import clsx from "clsx"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    disabled?: boolean;
}

export default function FormButton({
    children,
    disabled,
    className,
    ...rest
}: FormButtonProps) {
    return (
        <button
            {...rest}
            className={clsx(
                'px-2 py-1 bg-primaryColor text-white w-full rounded-md hover:bg-slate-200 hover:text-primaryColor transition duration 150',
                disabled && 'bg-slate-400 hover:bg-slate-400',
                className
            )}
            disabled={disabled}
        >
            {disabled ? <LoadingSpinner /> : children}
        </button>
    )
}