import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AuthBtns from "@/components/AuthBtns";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Spotify Clone",
    description: "Spotify Clone with Next.js and Supabase",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex">
                    <Sidebar />
                    <main className="flex flex-col flex-grow mx-1 rounded-md h-screen">
                        <Header>
                            <AuthBtns />
                        </Header>

                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
