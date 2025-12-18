"use client";

import { api } from "~/trpc/react";
import { use, useState } from "react";
import { ArrowLeft, Utensils, BookOpen, Trash2, Edit3, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReceitaDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const utils = api.useUtils();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editIngredients, setEditIngredients] = useState("");
  const [editBody, setEditBody] = useState("");

  const { data: posts, isLoading } = api.post.getUserPosts.useQuery();
  const receita = posts?.find((p) => p.id === Number(id));

  const deletePost = api.post.delete.useMutation({
    onSuccess: async () => {
      await utils.post.getUserPosts.invalidate();
      router.push("/dashboard");
    },
  });

  const updatePost = api.post.update.useMutation({
    onSuccess: async () => {
      await utils.post.getUserPosts.invalidate();
      setIsEditing(false);
    },
  });

  const handleStartEdit = () => {
    if (receita) {
      setEditTitle(receita.title);
      setEditIngredients(receita.ingredients || "");
      setEditBody(receita.body || "");
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    updatePost.mutate({
      id: Number(id),
      title: editTitle,
      ingredients: editIngredients,
      body: editBody,
    });
  };

  if (isLoading) return <div className="p-20 text-center font-bold text-gray-500">Carregando...</div>;
  if (!receita) return <div className="p-20 text-center text-red-500">Receita não encontrada!</div>;

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-24 px-4 md:px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        
        {/* CABEÇALHO DE AÇÕES - Ajustado para mobile */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition font-medium">
            <ArrowLeft size={20} /> Voltar
          </Link>

          <div className="flex gap-2 w-full sm:w-auto">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-full hover:bg-green-700 transition font-bold text-sm">
                  <Save size={18} /> Salvar
                </button>
                <button onClick={() => setIsEditing(false)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-4 py-2.5 rounded-full hover:bg-gray-300 transition font-bold text-sm">
                  <X size={18} /> Cancelar
                </button>
              </>
            ) : (
              <>
                <button onClick={handleStartEdit} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-full hover:bg-gray-200 transition font-bold text-sm">
                  <Edit3 size={18} /> Editar
                </button>
                <button 
                  onClick={() => { if(confirm("Excluir esta receita?")) deletePost.mutate({ id: Number(id) }); }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-full hover:bg-red-100 transition font-bold text-sm"
                >
                  <Trash2 size={18} /> Excluir
                </button>
              </>
            )}
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL - grid -> flex-col no mobile */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          
          {/* IMAGEM - Ocupa toda a largura no mobile */}
          <div className="w-full md:w-1/2">
            <div className="rounded-[30px] md:rounded-[40px] overflow-hidden shadow-xl bg-gray-100 aspect-square">
              <img 
                src={receita.imageUrl || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800"} 
                alt={receita.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* INFORMAÇÕES - Títulos menores no mobile */}
          <div className="w-full md:w-1/2">
            {isEditing ? (
              <div className="space-y-6">
                <input 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-2xl md:text-3xl font-bold border-b-2 border-red-600 focus:outline-none bg-transparent"
                  placeholder="Título da Receita"
                />
                <section>
                  <h3 className="text-lg font-bold text-red-600 mb-2">Ingredientes</h3>
                  <textarea 
                    value={editIngredients}
                    onChange={(e) => setEditIngredients(e.target.value)}
                    className="w-full p-4 bg-gray-50 rounded-2xl border min-h-[120px] focus:ring-2 ring-red-100 outline-none text-sm md:text-base"
                  />
                </section>
                <section>
                  <h3 className="text-lg font-bold text-red-600 mb-2">Modo de Preparo</h3>
                  <textarea 
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    className="w-full p-4 bg-gray-50 rounded-2xl border min-h-[180px] focus:ring-2 ring-red-100 outline-none text-sm md:text-base"
                  />
                </section>
              </div>
            ) : (
              <div className="space-y-8 md:space-y-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 border-b pb-4 leading-tight">
                  {receita.title}
                </h1>
                
                <section>
                  <h3 className="flex items-center gap-3 text-lg md:text-xl font-bold text-red-600 mb-4">
                    <Utensils size={22} /> Ingredientes
                  </h3>
                  <div className="bg-gray-50 p-5 md:p-6 rounded-3xl border border-gray-100">
                    <p className="text-gray-700 whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                      {receita.ingredients || "Nenhum ingrediente listado."}
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="flex items-center gap-3 text-lg md:text-xl font-bold text-red-600 mb-4">
                    <BookOpen size={22} /> Modo de Preparo
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap pl-1 text-sm md:text-base leading-relaxed">
                    {receita.body || "Nenhuma instrução adicionada."}
                  </p>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}