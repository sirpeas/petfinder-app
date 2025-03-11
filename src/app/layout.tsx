import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from '@/components/molecules/Header';
import { Footer } from '@/components/molecules/Footer';
import { AppProviders } from '@/components/organisms/AppProviders';

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PetFinder",
  description: "Find your pet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={`${openSans.variable} antialiased bg-sky-50 flex flex-col min-h-screen`}
        >
          <AppProviders>
            <Header />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </AppProviders>
        </body>
      </html>
  );
}
