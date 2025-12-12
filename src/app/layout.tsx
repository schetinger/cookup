import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/app/_components/navbar";
import { Footer } from "~/app/_components/footer";

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
      <body className="flex min-h-screen flex-col bg-white">
        <TRPCReactProvider>
          <Navbar />
          
          {/* O PULO DO GATO: pt-20 para compensar a navbar fixa */}
          <main className="flex-1 pt-20">
            {children}
          </main>

          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}