export default function LayoutBand({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-w-screen-lg mx-auto px-3">
            {children}
        </div>
    )
}