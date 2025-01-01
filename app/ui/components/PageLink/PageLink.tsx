import Link, { LinkProps } from "next/link";
import clsx from "clsx";

interface PageLinkProps extends LinkProps {
    children?: React.ReactNode;
    button?: boolean;
    className?: string;
}

export default function PageLink({
    children, 
    button = false, 
    className, 
    ...rest
}: PageLinkProps) {
    return (
        <Link 
            className={clsx(
                'block w-fit',
                button 
                    ? 'rounded bg-accent1 px-4 py-2.5 my-4 hover:bg-slate-200 text-white hover:text-accent1 transition duration 150' 
                    : 'text-accent1 mt-1 hover:underline',
                className
            )}
            {...rest}
        >
            {children}
        </Link>
    )
}