import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TOTP Cracker :3",
    description:
        "A very :3 project for finding TOTP secrets that result in a specific token at a specific time.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <div className="container mt-20 flex flex-col items-center gap-8">
                        <Link
                            href="/"
                            className="text-4xl font-bold lg:text-5xl text-slate-400"
                        >
                            TOTP cracker :3
                        </Link>
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
