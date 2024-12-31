import Link from "next/link";

interface CardLinkProps {
    colspan?: string;
    twClassName?: string;
    imgSrc?: string;
    href?: string;
    ariaLabel?: string;
    title: string;
}

export default function CardLink({
    colspan = 'col-span-1',
    twClassName,
    imgSrc,
    href = '#',
    ariaLabel,
    title,
}: CardLinkProps) {
    return (
        <div className={`${colspan}`}>
            <Link href={href} aria-label={ariaLabel}>
            <div
                    className={`w-full h-64 bg-slate-400 rounded-xl overflow-hidden cursor-pointer relative ${twClassName}`}
                >
                    <div
                        className="absolute inset-0 transition-transform transform scale-100 hover:scale-110"
                        style={{
                            backgroundImage: `url('${imgSrc}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                    <p className="absolute bottom-0 left-0 w-full text-center p-2 py-3 text-xl bg-primaryColor text-white">{title}</p>
                </div>
            </Link>
        </div>
    )
}