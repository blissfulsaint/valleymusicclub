import clsx from "clsx"

interface OutlineFieldsetLegendProps extends React.HTMLAttributes<HTMLLegendElement> {
    children?: React.ReactNode;
}

export default function OutlineFieldsetLegend({
    children,
    className,
    ...rest
}: OutlineFieldsetLegendProps) {
    return (
        <legend
            className={clsx(
                'px-2 text-lg text-primarySecondary',
                className
            )}
            {...rest}
        >
            {children}
        </legend>
    )
}