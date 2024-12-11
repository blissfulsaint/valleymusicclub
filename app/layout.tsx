import type { Metadata } from "next";
import { roboto } from "./ui/fonts";
import "./ui/globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | Valley Music Club',
    default: 'Valley Music Club',
  },
  description: 'The Official Website for Valley Music Club in Phoenix, Arizona.',
  metadataBase: new URL('https://valleymusicclub.vercel.app/'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
