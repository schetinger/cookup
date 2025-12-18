"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react"; // Importe ícones para facilitar

export function Navbar({ className = "" }: { className?: string }) {
  const [searching, setSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para o menu mobile

  return (
    <header className={`fixed top-0 left-0 w-full z-50 border-b bg-white/95 backdrop-blur-md ${className}`}>
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.jpeg" alt="CookUp" width={50} height={50} className="object-contain" />
          <span className="font-mono text-xl md:text-2xl font-bold">CookUP</span>
        </Link>

        {/* MENU DESKTOP (Invisível no celular) */}
        <ul className="hidden md:flex items-center space-x-6 font-mono">
          <li>
            {searching ? (
              <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                <input
                  autoFocus
                  type="text"
                  placeholder="Ex: Risoto..."
                  className="flex h-10 w-64 items-center justify-center rounded-full bg-red-500 px-6 text-sm text-white shadow-xl focus:outline-none placeholder:text-red-100"
                />
                <button type="button" className="absolute right-3 text-white" onClick={() => setSearching(false)}>
                  <X size={18} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearching(true)}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-5 py-2 text-xs shadow-md hover:bg-red-500 hover:text-white transition-all"
              >
                <Search size={14} />
                <span>Pesquisar</span>
              </button>
            )}
          </li>
          <li><Link href="/home" className="hover:text-red-500 transition-colors">Home</Link></li>
          <li><Link href="/topreceitas" className="hover:text-red-500 transition-colors">Top Receitas</Link></li>
          {/* BOTÃO ENTRAR NO LUGAR DO CADASTRO */}
          <li>
            <Link href="/login" className="rounded-full bg-red-500 px-8 py-2.5 text-white hover:bg-red-600 transition-all font-bold">
              Entrar
            </Link>
          </li>
        </ul>

        {/* BOTÃO MENU MOBILE (Apenas visível no celular) */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MENU MOBILE LATERAL/DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white border-b px-4 py-6 flex flex-col gap-4 font-mono animate-in slide-in-from-top duration-300">
          <Link href="/home" className="py-2 border-b" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/topreceitas" className="py-2 border-b" onClick={() => setIsOpen(false)}>Top Receitas</Link>
          <Link 
            href="/login" 
            className="w-full text-center bg-red-500 py-3 rounded-xl text-white font-bold"
            onClick={() => setIsOpen(false)}
          >
            Entrar
          </Link>
        </div>
      )}
    </header>
  );
}