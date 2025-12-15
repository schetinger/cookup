import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "CookUP",
  description: "Melhor site para mostrar suas receitas",
  icons: [{ rel: "icon", url: "/logo.jpeg" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable}`}>
      <body className="min-h-screen bg-white">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}