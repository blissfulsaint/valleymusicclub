import clsx from "clsx"

interface StatusMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children?: React.ReactNode;
    status: 'success' | 'error' | 'warning' | string;
}

const statusClasses: Record<string, string> = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
}

export default function StatusMessage({
    children,
    status,
    className,
    ...rest
}: StatusMessageProps) {
    return (
        <p
            {...rest}
            className={clsx(
                'p-0 my-1 text-sm',
                statusClasses[status] || 'text-white',
                className
            )}
        >
            {children}
        </p>
    )
}