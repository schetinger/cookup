import { api } from "~/trpc/server"; 
import React from 'react'; 
import { notFound } from "next/navigation";

// Definimos o componente como assíncrono para poder usar 'await'
export default async function ProfilePage() {
  
  // 1. CHAMA A PROCEDURE TRPC PARA BUSCAR OS DADOS REAIS
  const profileData = await api.profile.getProfileData.query();

  if (!profileData) {
    // Isso deve redirecionar ou mostrar uma página de 404
    notFound(); 
  }

  const { 
    username, 
    fullName, 
    bio, 
    followersCount, 
    followingCount, 
    recipesCount, 
    profileImage, 
    recipes 
  } = profileData;


  return (
    // Container Principal: Centraliza e limita a largura
    <div className="mx-auto max-w-5xl py-10 px-4 sm:px-6 lg:px-8">
      
      {/* 1. SEÇÃO DE CABEÇALHO (Profile Header - Estilo Pinterest) */}
      <header className="flex flex-col items-center pb-6 mb-8 text-center">
        
        {/* Imagem de Perfil Grande */}
        <div className="w-28 h-28 sm:w-40 sm:h-40 flex-shrink-0 mb-4">
          <img
            src={profileImage}
            alt="Foto de Perfil"
            className="w-full h-full rounded-full object-cover border-2 border-gray-300"
          />
        </div>
        
        {/* Nome Completo e Username */}
        <h1 className="text-3xl font-bold mb-1">{fullName}</h1>
        <p className="text-md text-gray-500 mb-4">@{username}</p>
        
        {/* Estatísticas (Seguidores, etc.) - Colocadas abaixo do nome */}
        <div className="flex justify-center space-x-4 mb-4 text-sm">
          <p>
            <span className="font-semibold">{followersCount.toLocaleString()}</span> seguidores
          </p>
          <p>
            <span className="font-semibold">{followingCount}</span> seguindo
          </p>
        </div>
        
        {/* Bio */}
        <p className="text-sm text-gray-700 max-w-sm mx-auto mb-6">
          {bio || "Nenhuma biografia adicionada."}
        </p>

        {/* Botões de Ação */}
        <div className="flex space-x-3">
            <button className="bg-gray-200 hover:bg-gray-300 text-sm font-semibold py-2 px-6 rounded-full transition duration-150">
              Editar Perfil
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-6 rounded-full transition duration-150">
              Compartilhar
            </button>
        </div>
      </header>
      
      {/* 2. BARRA DE NAVEGAÇÃO / GRADE DE RECEITAS */}
      <section>
        {/* Barra de Navegação de Conteúdo (Pins/Receitas) */}
        <div className="flex justify-center border-t pt-4 mb-6">
          <div className="flex space-x-8">
            <button className="text-sm font-bold border-b-2 border-black pb-2 text-gray-900">
              TODAS AS RECEITAS ({recipesCount})
            </button>
            <button className="text-sm font-medium pb-2 text-gray-500">
              SALVAS
            </button>
          </div>
        </div>

        {/* Grade de Fotos (Estilo Pinterest, usando colunas responsivas) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {recipes.map((recipe) => (
            // Note: O estilo Pinterest real usa layout 'masonry', mas
            // o grid normal é mais fácil de implementar com Tailwind.
            <div key={recipe.id} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <img
                src={recipe.imageUrl}
                alt={`Receita ${recipe.id}`}
                className="w-full h-full object-cover transition duration-300 transform hover:scale-105"
              />
              {/* O nome da receita pode ir no hover ou abaixo da imagem */}
              <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-30 w-full">
                <p className="text-white text-xs font-semibold">Título da Receita {recipe.id}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}