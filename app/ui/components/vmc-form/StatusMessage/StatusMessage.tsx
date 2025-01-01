import clsx from "clsx"

interface StatusMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children?: React.ReactNode;
    status: 'success' | 'error';
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
                status === 'error' && 'text-red-500',
                status === 'success' && 'text-green-500',
                className
            )}
        >
            {children}
        </p>
    )
}