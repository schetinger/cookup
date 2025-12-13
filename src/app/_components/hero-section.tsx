"use client";

import { ChefHat, Search } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      
      {/* MUDANÇA AQUI: Usando a imagem local da pasta public/images */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          // Se o seu arquivo for .png, troque .jpg por .png abaixo
          backgroundImage: `url('/images/hero-bg.png')`,
        }}
      >
        {/* Mantemos o gradiente por cima para o texto ficar legível */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-amber-900/90" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/20">
            <ChefHat className="h-4 w-4" />
            <span>Mais de 10.000 receitas disponíveis</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl font-serif">
            Descubra e Compartilhe as Melhores Receitas
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-200 md:text-xl">
            Explore um universo culinário com receitas criativas e compartilhe sua paixão com o mundo.
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="flex items-center gap-2 h-14 px-8 rounded-md bg-red-600 text-white font-medium text-lg hover:bg-red-700 transition-colors shadow-lg">
              <Search className="h-5 w-5" />
              Explorar Receitas
            </button>
            <Link 
                href="/login"
                className="flex items-center justify-center h-14 px-8 rounded-md bg-white/10 border-2 border-white text-white font-medium text-lg hover:bg-white hover:text-amber-900 transition-colors"
            >
              Compartilhar Receita
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}