"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { AtSign, User, FileText, Calendar, ArrowLeft } from "lucide-react";

export default function PerfilPage() {
  const utils = api.useUtils();
  const { data: profile, isLoading, error } = api.profile.getProfileData.useQuery();
  
  // Hook para salvar os dados
  const updateProfile = api.profile.updateProfile.useMutation({
    onSuccess: () => {
      // Atualiza os dados na tela pegando o que acabou de ser salvo no banco
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

  // Sincroniza o formulário sempre que os dados do perfil carregarem
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
    <div className="flex min-h-screen items-center justify-center bg-[#FDFBF9] p-4 md:p-8 pt-24">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        
        {/* Lado Esquerdo - Imagem */}
        <div className="relative hidden w-1/2 md:block">
          <img 
            src="https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1000" 
            alt="Pasta" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center bg-black/40 p-16 text-white backdrop-blur-[1px]">
            <h1 className="font-serif text-5xl font-light">Seu Perfil</h1>
          </div>
        </div>

        {/* Lado Direito - Informações */}
        <div className="w-full p-8 md:w-1/2 lg:p-14 bg-white">
          <div className="flex justify-between items-center mb-10">
            <button className="text-gray-400 hover:text-gray-600 flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} /> Voltar
            </button>
            <div className="flex items-center gap-2">
              <span className="text-orange-600 text-xl">🍳</span>
              <span className="font-serif font-bold text-gray-800 tracking-tight">CookUp</span>
            </div>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="h-28 w-28 rounded-full bg-orange-50 border-[3px] border-orange-100 flex items-center justify-center overflow-hidden text-orange-500 text-4xl mb-4">
              {profile?.image ? <img src={profile.image} alt="Avatar" className="h-full w-full object-cover" /> : profile?.name?.charAt(0)}
            </div>
            
            <div className="flex items-center gap-3">
              {isEditing ? (
                <input 
                  className="text-2xl font-serif text-gray-800 border-b border-orange-300 focus:outline-none text-center"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              ) : (
                <h2 className="text-2xl font-serif text-gray-800">{profile?.name}</h2>
              )}
            </div>
          </div>

          <div className="space-y-5 border-t border-gray-50 pt-8">
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
                    <Calendar size={16} /> <p className="text-[11px] font-bold uppercase">Membro desde</p>
                  </div>
                  <p className="text-gray-700 pl-6">{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('pt-BR') : "---"}</p>
               </div>
            )}
          </div>

          {/* Lógica de Salvamento conectada ao Banco */}
          <button 
            onClick={() => {
              if (isEditing) {
                // Chama a função que grava no SQLite
                updateProfile.mutate(formData);
              } else {
                startEditing();
              }
            }}
            disabled={updateProfile.isPending}
            className="mt-10 w-full rounded-2xl bg-[#EE6338] py-4 text-white font-bold shadow-xl hover:bg-[#d55630] transition-all disabled:opacity-50"
          >
            {updateProfile.isPending ? "Salvando..." : isEditing ? "Salvar Alterações" : "Editar Perfil"}
          </button>
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
            className="ml-6 p-2 text-[15px] border rounded-lg focus:ring-1 focus:ring-orange-500 outline-none w-full"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input 
            className="ml-6 p-1 text-[15px] border-b focus:border-orange-500 outline-none w-full"
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