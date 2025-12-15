import { api } from "~/trpc/server"; 
import React from 'react'; 
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, MessageSquare } from "lucide-react"; // Ícones úteis

// IMPORTAÇÃO DOS ESTILOS:
// Este arquivo (sec3.module.css) é o mesmo usado no login e cria o layout de duas colunas.
import styles from "~/styles/sec3.module.css"; 

// Importa um asset de imagem (assumindo que você tem no seu projeto)
import pasta from "~/assets/images/pasta.jpg"; 


export default async function ProfilePage() {
  
  // 1. CHAMA A PROCEDURE TRPC PARA BUSCAR OS DADOS REAIS
  // O seu TRPC precisa retornar todos esses campos:
  const profileData = await api.profile.getProfileData.query(); 

  if (!profileData) {
    notFound(); 
  }

  // Desestruturamos os dados do TRPC
  const { 
    username, 
    fullName, 
    bio, 
    memberSince, // Deve ser um campo retornado pelo seu TRPC/Prisma (ex: createdAt)
    profileImage, 
  } = profileData;

  // Formata a data de membro (exemplo)
  const memberDate = new Date(memberSince || new Date()).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });


  return (
    // Usa a mesma estrutura de container do login para ter o layout de duas colunas
    <div className={`${styles.bodyCadastro} h-screen flex items-center justify-center`}>
      <div className={`${styles.containerCadastro} overflow-hidden`}>
        
        {/* LADO ESQUERDO: Visual Area (Fundo com imagem) */}
        <div
          className={styles.visualArea}
          style={{ backgroundImage: `url(${pasta.src})` }}
        >
          <h1 className={styles.visualTitle}>Seu Perfil</h1>
          <p className={styles.visualSubtitle}>
            Personalize sua conta e mostre ao mundo sua paixão pela culinária.
          </p>
        </div>

        {/* LADO DIREITO: Form Area (Conteúdo do Perfil) */}
        <div className={styles.formArea}>
          
          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
              <ArrowLeft size={16} className="mr-1" /> Voltar
            </Link>
            <span className="text-lg font-bold">CookUp</span>
          </div>

          {/* Área Principal do Perfil */}
          <div className="flex flex-col items-center text-center p-4">
            
            {/* Imagem de Perfil */}
            <div className="w-28 h-28 flex-shrink-0 mb-4 rounded-full bg-orange-100 p-1 border-2 border-orange-300">
              <img
                src={profileImage || "/default-avatar.png"}
                alt="Foto de Perfil"
                // A imagem de perfil da Maria não tem imagem real, vamos simular a letra 'M'
                // Se a profileImage for nula, mostramos a primeira letra do nome.
                className="w-full h-full rounded-full object-cover"
              />
              {/* Para simular a letra 'M' como na imagem original: */}
              {!profileImage && (
                 <div className="w-full h-full rounded-full bg-orange-200 flex items-center justify-center">
                    <span className="text-5xl font-semibold text-orange-600">{fullName ? fullName[0] : 'U'}</span>
                 </div>
              )}
            </div>
            
            {/* Nome e Tag de Usuário */}
            <h1 className="text-xl font-semibold mt-2 mb-1">{fullName}</h1>
            <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full mb-4">Usuário</span>
            <p className="text-sm text-gray-600 mb-6">@{username}</p>

            {/* Detalhes do Perfil */}
            <div className="w-full text-left space-y-3 border-t pt-4">
                
                {/* Username */}
                <div className="flex items-start">
                    <User size={16} className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                    <div>
                        <p className="text-xs text-gray-500">Username</p>
                        <p className="text-sm font-medium">@{username}</p>
                    </div>
                </div>

                {/* Nome/Apelido */}
                <div className="flex items-start">
                    <User size={16} className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                    <div>
                        <p className="text-xs text-gray-500">Apelido</p>
                        <p className="text-sm font-medium">{fullName}</p>
                    </div>
                </div>

                {/* Bio */}
                <div className="flex items-start">
                    <MessageSquare size={16} className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                    <div>
                        <p className="text-xs text-gray-500">Bio</p>
                        <p className="text-sm text-gray-700">{bio || "Nenhuma biografia adicionada."}</p>
                    </div>
                </div>

                {/* Membro Desde */}
                <div className="text-sm text-gray-500 pt-2 border-t mt-4">
                    Membro desde: <span className="font-medium text-gray-700">{memberDate}</span>
                </div>
            </div>

          </div>

          {/* Botão de Ação */}
          <div className="mt-8">
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition duration-150 shadow-lg">
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}