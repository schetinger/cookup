"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Loader2, UtensilsCrossed, BookOpen, PenTool } from "lucide-react";

export function LatestPost() {
  // Busca o último post para exibir um resumo
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [body, setBody] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.getUserPosts.invalidate(); // Invalida a lista geral também
      await utils.post.getLatest.invalidate();
      setTitle("");
      setIngredients("");
      setBody("");
      alert("Receita salva com sucesso!");
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      {/* RESUMO NO MOBILE */}
      <div className="mb-8 p-4 bg-orange-50 rounded-2xl border border-orange-100">
        {latestPost ? (
          <p className="text-orange-800 text-sm font-medium">
            ✨ <span className="font-bold text-orange-950">Última:</span> {latestPost.title}
          </p>
        ) : (
          <p className="text-gray-500 text-sm italic">Crie sua primeira receita abaixo!</p>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ title, ingredients, body });
        }}
        className="flex flex-col gap-5"
      >
        {/* CAMPO TÍTULO */}
        <div className="relative">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1 ml-1">
            <PenTool size={16} className="text-orange-600" /> Título
          </label>
          <input
            type="text"
            placeholder="Ex: Bolo de Cenoura"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:ring-2 ring-orange-500/20 focus:border-orange-500 transition-all"
            required
          />
        </div>

        {/* CAMPO INGREDIENTES */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1 ml-1">
            <UtensilsCrossed size={16} className="text-orange-600" /> Ingredientes
          </label>
          <textarea
            placeholder="Liste os ingredientes..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:ring-2 ring-orange-500/20 focus:border-orange-500 min-h-[120px] transition-all"
            required
          />
        </div>

        {/* CAMPO MODO DE PREPARO */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1 ml-1">
            <BookOpen size={16} className="text-orange-600" /> Modo de Preparo
          </label>
          <textarea
            placeholder="Como preparar?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:ring-2 ring-orange-500/20 focus:border-orange-500 min-h-[180px] transition-all"
            required
          />
        </div>
        
        {/* BOTÃO SALVAR ADAPTADO PARA MOBILE */}
        <button
          type="submit"
          className="w-full md:w-auto self-center rounded-full bg-orange-600 px-12 py-4 font-bold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:scale-100 flex items-center justify-center gap-2"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Salvando...
            </>
          ) : (
            "Salvar Receita"
          )}
        </button>
      </form>
    </div>
  );
}