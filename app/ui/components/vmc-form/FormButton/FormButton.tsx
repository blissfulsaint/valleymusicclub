import clsx from "clsx"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
}

export default function FormButton({
    children,
    disabled,
    loading,
    className,
    ...rest
}: FormButtonProps) {
    return (
        <button
            {...rest}
            className={clsx(
                'px-2 py-1 text-white w-full rounded-md transition duration 150',
                disabled || loading ? 'bg-slate-400 hover:bg-slate-400' : 'bg-primaryColor hover:bg-slate-200 hover:text-primaryColor',
                className
            )}
            disabled={disabled || loading}
        >
            {loading ? <LoadingSpinner /> : children}
        </button>
    )
}