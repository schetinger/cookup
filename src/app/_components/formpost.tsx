"use client"
import React, { useState, type ChangeEvent, type FormEvent } from 'react';

export function CriarReceita() {
  const [titulo, setTitulo] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  // Estados para feedback visual
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMensagem('');

    const formData = new FormData();
    formData.append('nome', titulo);
    formData.append('descricao', ingredientes);
    formData.append('modoPreparo', modoPreparo);

    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      const response = await fetch('/api/receitas', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMensagem('Receita salva com sucesso!');
        setTitulo('');
        setIngredientes('');
        setModoPreparo('');
        setImagem(null);
      } else {
        setMensagem('Erro ao salvar a receita.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Nova Receita
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Título da Receita
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            placeholder="Ex: Bolo de Cenoura"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Ingredientes
          </label>
          <textarea
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
            required
            rows={4}
            placeholder="Liste os ingredientes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Modo de Preparo
          </label>
          <textarea
            value={modoPreparo}
            onChange={(e) => setModoPreparo(e.target.value)}
            required
            rows={4}
            placeholder="Descreva o passo a passo..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Foto do Prato
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md text-white font-bold tracking-wide transition duration-200
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
            }`}
        >
          {loading ? 'Enviando...' : 'Salvar Receita'}
        </button>
      </form>

      {mensagem && (
        <div className={`mt-4 p-3 rounded-md text-center text-sm font-medium ${
          mensagem.includes('sucesso') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {mensagem}
        </div>
      )}
    </div>
  );
};

export default CriarReceita;