import clsx from "clsx";

interface InputContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export default function InputContainer({
    children,
    className,
    ...rest
}: InputContainerProps) {
    return (
        <div
            {...rest}
            className={clsx(
                'mb-3',
                className
            )}
        >
            {children}
        </div>
    )
}