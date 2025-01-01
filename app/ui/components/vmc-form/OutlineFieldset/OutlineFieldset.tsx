import clsx from "clsx";

interface OutlineFieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
    children?: React.ReactNode;
}

export default function OutlineFieldset({
    children, 
    className, 
    ...rest
}: OutlineFieldsetProps) {
    return (
        <fieldset
            className={clsx(
                'rounded-xl border-solid border-2 border-primarySecondary max-w-md p-4 m-auto',
                className
            )}
            {...rest}
        >
            {children}
        </fieldset>
    )
}