interface CardLinkProps {
    colspan?: string;
    width?: string;
    height?: string;
    bgColor?: string;
    imgSrc?: string;
}

export default function CardLink({
    colspan = 'col-span-1',
    width = 'w-full',
    height = 'h-64',
    bgColor = 'bg-slate-400',
}: CardLinkProps) {
    const mdColSpan = 'md:' + colspan;

    return (
        <div className={`sm:col-span-1 ${mdColSpan} ${width} ${height} ${bgColor} rounded-xl`}></div>
    )
}