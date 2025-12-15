import { db } from "~/server/db";
import { notFound } from "next/navigation";
import {CriarReview} from '~/app/_components/formreview'
import { integer } from "node_modules/zod/v4/core/regexes.cjs";
import { int } from "zod/v4-mini";

// pegar dado passado pelo params
//export default async function PaginaReceita({ params }: { params: { id: string } }) {
export default async function PaginaReview() {
  
//const idReceita = parseInt(params.id); enquanto nao tem params
//  if (isNaN(idReceita)) return notFound();
let idReceita:number =2;
 const receita = await db.postReceita.findUnique({
   where: { id: idReceita },
   include: { user: true }
 });
if (!receita) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Exibição dos dados da Receita */}
      <img src={receita.imageUrl || ""} alt={receita.title} className="w-full h-64 object-cover rounded-lg mb-6"/>
      <h1 className="text-4xl font-bold mb-2">{receita.title}</h1>
      <p className="text-gray-600 mb-6">Por: {receita.user.nickname}</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
           <h3 className="text-xl font-bold">Ingredientes</h3>
           <p>{receita.ingredients}</p>
        </div>
        <div>
           <h3 className="text-xl font-bold">Modo de Preparo</h3>
           <p>{receita.body}</p>
        </div>
      </div>

      <hr className="my-10 border-gray-300"/>

      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4">O que você achou?</h3>
       <CriarReview  
        receitaId = {receita.id.toString()}
        userId = {receita.user.id.toString()}>
        </CriarReview>
      </div>
    </div>
  );
}