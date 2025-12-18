"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { AtSign, FileText, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PerfilPage() {
  const utils = api.useUtils();
  const { data: profile, isLoading, error } = api.profile.getProfileData.useQuery();
  
  const updateProfile = api.profile.updateProfile.useMutation({
    onSuccess: () => {
      void utils.profile.getProfileData.invalidate();
      setIsEditing(false);
      alert("Perfil atualizado com sucesso!");
    },
    onError: (err) => {
      alert("Erro ao salvar: " + err.message);
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: ""
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name ?? "",
        username: profile.username ?? "",
        bio: profile.bio ?? ""
      });
    }
  }, [profile]);

  const startEditing = () => {
    setIsEditing(true);
  };

  if (isLoading) return <div className="p-10 text-center">Carregando perfil...</div>;
  if (error) return <div className="p-10 text-red-500 text-center">Erro: {error.message}</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFBF9] p-4 md:p-8 pt-20 md:pt-24">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-[2rem] md:rounded-3xl bg-white shadow-2xl">
        
        {/* Lado Esquerdo - Imagem (Fica escondida no Mobile) */}
        <div className="relative hidden w-1/2 md:block">
          <img 
            src="https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1000" 
            alt="Fundo" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center bg-black/40 p-16 text-white backdrop-blur-[1px]">
            <h1 className="font-serif text-5xl font-light">Seu Perfil</h1>
          </div>
        </div>

        {/* Lado Direito - Informações (Ocupa 100% no Mobile) */}
        <div className="w-full p-6 md:p-14 bg-white">
          <div className="flex justify-between items-center mb-8 md:mb-10">
            <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 flex items-center gap-2 text-sm font-medium transition">
              <ArrowLeft size={16} /> Voltar
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-orange-600 text-xl">🍳</span>
              <span className="font-serif font-bold text-gray-800 tracking-tight">CookUp</span>
            </div>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-orange-50 border-[3px] border-orange-100 flex items-center justify-center overflow-hidden text-orange-500 text-3xl md:text-4xl mb-4 shadow-inner">
              {profile?.image ? (
                <img src={profile.image} alt="Avatar" className="h-full w-full object-cover" /> 
              ) : (
                profile?.name?.charAt(0)
              )}
            </div>
            
            <div className="flex items-center gap-3 w-full justify-center">
              {isEditing ? (
                <input 
                  className="text-xl md:text-2xl font-serif text-gray-800 border-b border-orange-300 focus:outline-none text-center bg-orange-50/10 rounded-t-lg px-2 w-full max-w-[250px]"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  autoFocus
                />
              ) : (
                <h2 className="text-2xl font-serif text-gray-800 text-center">{profile?.name}</h2>
              )}
            </div>
          </div>

          <div className="space-y-6 md:space-y-5 border-t border-gray-50 pt-8">
            <InfoItem 
              label="Username" 
              icon={<AtSign size={16} />} 
              isEditing={isEditing}
              value={isEditing ? formData.username : (profile?.username ? `@${profile.username}` : "Não definido")}
              onChange={(val) => setFormData({...formData, username: val})}
            />
            <InfoItem 
              label="Bio" 
              icon={<FileText size={16} />} 
              isEditing={isEditing}
              isTextArea
              value={isEditing ? formData.bio : (profile?.bio || "Nenhuma bio definida.")}
              onChange={(val) => setFormData({...formData, bio: val})}
            />
            {!isEditing && (
               <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1 text-gray-400">
                    <Calendar size={16} /> <p className="text-[11px] font-bold uppercase tracking-wider">Membro desde</p>
                  </div>
                  <p className="text-gray-700 pl-6 text-sm md:text-base">
                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('pt-BR') : "---"}
                  </p>
               </div>
            )}
          </div>

          {/* BOTÕES DE AÇÃO - Adaptados para Mobile */}
          <div className="flex flex-col gap-3 mt-10">
            <button 
              onClick={() => {
                if (isEditing) {
                  updateProfile.mutate(formData);
                } else {
                  startEditing();
                }
              }}
              disabled={updateProfile.isPending}
              className="w-full rounded-2xl bg-[#EE6338] py-4 text-white font-bold shadow-xl hover:bg-[#d55630] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {updateProfile.isPending ? "Salvando..." : isEditing ? "Salvar Alterações" : "Editar Perfil"}
            </button>

            {!isEditing && (
              <Link 
                href="/dashboard" 
                className="w-full rounded-2xl bg-gray-900 py-4 text-white font-bold text-center shadow-lg hover:bg-black active:scale-[0.98] transition-all"
              >
                Pronto
              </Link>
            )}

            {isEditing && (
              <button 
                onClick={() => setIsEditing(false)}
                className="w-full py-2 text-gray-400 text-sm font-medium hover:text-gray-600 transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ 
  label, value, icon, isEditing, isTextArea, onChange 
}: { 
  label: string; value?: string | null; icon: React.ReactNode; 
  isEditing: boolean; isTextArea?: boolean; onChange: (val: string) => void 
}) {
  return (
    <div className="group flex flex-col">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-gray-400">{icon}</span>
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      </div>
      {isEditing ? (
        isTextArea ? (
          <textarea 
            className="ml-0 md:ml-6 p-3 text-[15px] border border-gray-200 rounded-xl focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none w-full min-h-[100px] md:min-h-[80px] resize-none bg-gray-50/50"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input 
            className="ml-0 md:ml-6 p-2 text-[15px] border-b border-gray-200 focus:border-orange-500 outline-none w-full bg-transparent"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        )
      ) : (
        <p className="text-gray-700 font-medium text-[15px] pl-6">{value ?? "Não informado"}</p>
      )}
    </div>
  );
}