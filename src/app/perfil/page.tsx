"use client";

import Image from "next/image";
import { api } from "@/trpc/react"; // Ajuste o import conforme seu projeto

export default function PerfilPage() {
  // 1. ARRUMANDO O ERRO: Use apenas o nome do procedimento. 
  // O tRPC já sabe que é uma query. Não adicione ".query" no caminho.
  const { data: profile, isLoading, error } = api.profile.getProfileData.useQuery();

  if (isLoading) return <div className="p-10 text-center">Carregando perfil...</div>;
  
  // Se der o erro "No procedure found", verifique se no seu router 
  // o nome é 'getProfileData' e se ele está dentro de 'profile'.
  if (error) return <div className="p-10 text-red-500">Erro: {error.message}</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFBF9] p-4">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        
        {/* Lado Esquerdo - Imagem Decorativa */}
        <div className="relative hidden w-1/2 md:block">
          <img 
            src="https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1000" 
            alt="Pasta" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center bg-black/30 p-16 text-white backdrop-blur-[2px]">
            <h1 className="font-serif text-5xl font-light">Seu Perfil</h1>
            <p className="mt-4 text-lg opacity-90">
              Personalize sua conta e mostre ao mundo sua paixão pela culinária.
            </p>
          </div>
        </div>

        {/* Lado Direito - Informações */}
        <div className="w-full p-8 md:w-1/2 lg:p-16">
          <div className="flex justify-between items-center mb-12">
            <button className="text-gray-400 hover:text-gray-600 transition flex items-center gap-2">
              <span>←</span> Voltar
            </button>
            <div className="flex items-center gap-2">
              <span className="text-orange-600">🍳</span>
              <span className="font-serif font-bold text-gray-800">CookUp</span>
            </div>
          </div>

          {/* Avatar dinâmico */}
          <div className="flex flex-col items-center mb-10">
            <div className="h-24 w-24 rounded-full bg-orange-50 border-2 border-orange-100 flex items-center justify-center text-orange-500 text-3xl font-serif mb-4 shadow-sm">
              {profile?.name?.charAt(0) || "U"}
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-serif text-gray-800">{profile?.name}</h2>
              <span className="text-[10px] uppercase tracking-widest bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">
                Usuário
              </span>
            </div>
            <p className="text-gray-400">@{profile?.username}</p>
          </div>

          {/* Lista de Informações */}
          <div className="space-y-6">
            <InfoItem label="Username" value={`@${profile?.username}`} icon="at" />
            <InfoItem label="Apelido" value={profile?.name} icon="user" />
            <InfoItem label="Bio" value={profile?.bio || "Sem biografia definida."} icon="text" />
            <InfoItem label="Membro desde" value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('pt-BR') : "---"} icon="calendar" />
          </div>

          <button className="mt-12 w-full rounded-xl bg-[#EE6338] py-4 text-white font-semibold shadow-lg shadow-orange-200 hover:bg-[#d55630] transition-all transform active:scale-[0.98]">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, icon }: { label: string; value?: string; icon: string }) {
  return (
    <div className="group">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-2">
        <span className="opacity-50">#</span> {label}
      </p>
      <p className="text-gray-700 font-medium group-hover:text-orange-600 transition-colors">
        {value}
      </p>
    </div>
  );
}