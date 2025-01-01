import clsx from "clsx"

export default function OutlineInput({
    className,
    ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input 
            {...rest}
            className={clsx(
                'block border border-primarySecondary rounded-md px-2 py-1 w-full bg-background',
                className
            )}
        />
    )
}