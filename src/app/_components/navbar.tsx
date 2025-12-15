"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Navbar({ className = "" }: { className?: string }) {
  const [searching, setSearching] = useState(false);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 border-b bg-white/95 backdrop-blur-md ${className}`}>
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.jpeg" alt="CookUp" width={60} height={60} className="object-contain" />
          <span className="mt-2 font-mono text-2xl font-bold">CookUP</span>
        </Link>

        {/* Menu */}
        <ul className="flex items-center space-x-4 font-mono">
          <li>
            {searching ? (
              <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                <input
                  autoFocus
                  type="text"
                  placeholder="Ex: Risoto..."
                  className="flex h-10 w-64 items-center justify-center rounded-full bg-red-500 px-10 text-sm text-white shadow-xl focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute right-3 text-white"
                  onClick={() => setSearching(false)}
                >
                  X
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearching(true)}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-6 py-2.5 text-xs shadow-md hover:bg-red-500 hover:text-white transition-all"
              >
                <span>Pesquisar</span>
              </button>
            )}
          </li>
          <li><Link href="/home" className="hover:text-red-500 transition-colors">Home</Link></li>
          <li><Link href="/topreceitas" className="hover:text-red-500 transition-colors">Top Receitas</Link></li>
          <li><Link href="/login" className="hover:text-red-500 transition-colors">Entrar</Link></li>
          <li><Link href="/register" className="rounded-md bg-red-400 px-6 py-2.5 text-white hover:bg-red-500 transition-all">Cadastro</Link></li>
        </ul>
      </nav>
    </header>
  );
}