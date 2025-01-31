import type { Metadata } from "next";
import { roboto } from "./ui/fonts";
import "./ui/globals.scss";
import Header from "./ui/components/body/Header/Header";
import Footer from "./ui/components/body/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";

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
      <AuthProvider>
        <body className={`${roboto.className} antialiased h-screen flex flex-col`}>
          <Header />
          <main className="grow">
            {children}
          </main>
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
