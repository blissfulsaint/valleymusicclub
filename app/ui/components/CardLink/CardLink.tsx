import Link from "next/link";

interface CardLinkProps {
    colspan?: string;
    width?: string;
    height?: string;
    bgColor?: string;
    imgSrc?: string;
    href?: string;
    title: string;
}

export default function CardLink({
    colspan = 'col-span-1',
    width = 'w-full',
    height = 'h-64',
    bgColor = 'bg-slate-400',
    imgSrc,
    href = '#',
    title
}: CardLinkProps) {
    return (
        <div className={`${colspan}`}>
            <Link href={href}>
            <div
                    className={`${width} ${height} ${bgColor} rounded-xl overflow-hidden cursor-pointer relative`}
                >
                    <div
                        className="absolute inset-0 transition-transform transform scale-100 hover:scale-110"
                        style={{
                            backgroundImage: `url('${imgSrc}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                    <p className="absolute bottom-0 left-0 w-full text-center p-2 py-3 text-xl bg-primaryColor">{title}</p>
                </div>
            </Link>
        </div>
    )
}