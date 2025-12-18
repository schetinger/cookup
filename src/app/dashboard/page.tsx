"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Plus, FilePlus, FolderPlus, Search } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [showMenu, setShowMenu] = useState(false);
  
  const { data: profile } = api.profile.getProfileData.useQuery();
  const { data: posts, isLoading } = api.post.getUserPosts.useQuery();

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24 px-4 sm:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* CABEÇALHO - Ajustado para empilhar no celular */}
        <header className="flex flex-col md:flex-row justify-between items-center md:items-center mb-8 md:mb-12 gap-6 text-center md:text-left">
          <div className="flex-1 w-full">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Suas receitas salvas</h1>
            
            {/* ABAS - Scroll horizontal no celular para não quebrar a linha */}
            <nav className="flex justify-center md:justify-start space-x-6 md:space-x-8 text-sm font-bold overflow-x-auto pb-2 scrollbar-hide">
              <button className="border-b-2 border-black pb-2 whitespace-nowrap">Receitas</button>
              <button className="text-gray-500 hover:text-black pb-2 transition whitespace-nowrap">Pastas</button>
              <button className="text-gray-500 hover:text-black pb-2 transition whitespace-nowrap">Curtidas</button>
            </nav>
          </div>

          {/* PERFIL - Oculta detalhes no mobile para focar na foto */}
          <Link href="/perfil" className="flex items-center gap-3 md:gap-4 p-2 md:p-3 hover:bg-gray-50 rounded-full md:rounded-3xl transition-all group">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                {profile?.name || "Carregando..."}
              </p>
              <p className="text-xs text-gray-500">Seguindo 0</p>
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm ring-1 ring-gray-100">
              <img 
                src={profile?.image || "/default-profile.png"} 
                alt="Foto de Perfil" 
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </header>

        {/* ÁREA DE CONTEÚDO */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : posts && posts.length > 0 ? (
            /* GRID RESPONSIVO: 2 colunas no celular, aumenta conforme a tela */
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 md:gap-4 space-y-3 md:space-y-4">
              {posts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/dashboard/receita/${post.id}`}
                  className="break-inside-avoid block rounded-xl md:rounded-2xl overflow-hidden bg-gray-50 group relative cursor-zoom-in shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <img 
                    src={post.imageUrl || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800"} 
                    alt={post.title} 
                    className="w-full h-auto object-cover" 
                  />
                  {/* Overlay adaptado: Toque amigável no mobile */}
                  <div className="absolute inset-0 bg-black/20 md:bg-black/30 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 md:p-4">
                    <span className="self-end bg-red-600 text-white font-bold py-1 px-2 md:px-3 rounded-full text-[8px] md:text-[10px] uppercase tracking-wider">
                      Ver
                    </span>
                    <p className="text-white text-xs md:text-sm font-bold truncate drop-shadow-md">
                      {post.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* ESTADO VAZIO RESPONSIVO */
            <div className="flex flex-col items-center text-center py-12 md:py-16 px-4 animate-in fade-in zoom-in duration-500">
              <div className="w-32 h-32 md:w-48 md:h-48 mb-6 md:mb-8">
                <img 
                  src="https://v5.airtableusercontent.com/v3/u/34/34/1734523200000/vGfLpM8_3U6p8S_6H_R2vA/j7p8eS0I7z8_6H_R2vA/empty-state.png" 
                  alt="Inspiração" 
                  className="w-full h-full object-contain grayscale opacity-60" 
                />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Salve o que inspira você</h2>
              <p className="text-gray-500 text-sm md:text-base max-w-xs mb-8 leading-relaxed">
                Explore novas receitas e salve-as para se inspirar.
              </p>
              <button className="w-full md:w-auto flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 md:py-4 px-10 rounded-full shadow-lg transition-transform active:scale-95">
                <Search size={18} /> Explorar Receitas
              </button>
            </div>
          )}
        </div>

        {/* BOTÃO FLUTUANTE - Posição fixa ideal para mobile */}
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col items-end gap-3 md:gap-4 z-50">
          {showMenu && (
            <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl w-48 md:w-52 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
              <Link 
                href="/post"
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 font-bold border-b border-gray-50 text-sm text-gray-800 transition"
              >
                <FilePlus size={18} className="text-gray-400" /> Criar Receita
              </Link>
              <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 font-bold text-sm text-gray-800 transition">
                <FolderPlus size={18} className="text-gray-400" /> Criar Pasta
              </button>
            </div>
          )}
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className={`flex items-center gap-2 md:gap-3 ${showMenu ? 'bg-black' : 'bg-red-600'} text-white pr-6 md:pr-7 pl-5 md:pl-6 py-3 md:py-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300`}
          >
            <Plus size={24} className={showMenu ? "rotate-45 transition-transform" : "transition-transform"} />
            <span className="font-bold text-base md:text-lg">Criar</span>
          </button>
        </div>
      </div>
    </div>
  );
}