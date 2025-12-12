"use client";

import Image from "next/image";
import { Clock, Heart, Star } from "lucide-react";

const recipes = [
  { id: 1, title: "Pancakes de Mirtilo", image: "/images/Pancakes de Mirtilo.png", time: "25 min", rating: 4.8, likes: 342, category: "Café da Manhã" },
  { id: 2, title: "Sanduíche Gourmet", image: "/images/Sanduíche Gourmet.png", time: "15 min", rating: 4.6, likes: 256, category: "Lanche" },
  { id: 3, title: "Bolo de Chocolate", image: "/images/Bolo de Chocolate Premium.png", time: "60 min", rating: 4.9, likes: 523, category: "Sobremesa" },
  { id: 4, title: "Carbonara Clássica", image: "/images/Pasta Carbonara Clássica.png", time: "30 min", rating: 4.7, likes: 412, category: "Principal" },
  { id: 5, title: "Salada Mediterrânea", image: "/images/Salada Fresca Mediterrânea.png", time: "10 min", rating: 4.5, likes: 189, category: "Saudável" },
  { id: 6, title: "Costela BBQ", image: "/images/Costela BBQ Caramelizada.png", time: "120 min", rating: 4.9, likes: 687, category: "Churrasco" },
];

export function RecipeGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold font-serif text-gray-900 mb-4">Receitas em Destaque</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore as receitas mais populares da nossa comunidade e inspire-se.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl border border-gray-100">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                    src={recipe.image} 
                    alt={recipe.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute top-3 right-3">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:text-red-500">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {recipe.category}
                </span>
              </div>

              <div className="p-5 space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 font-serif group-hover:text-red-600 transition-colors">
                  {recipe.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-gray-900">{recipe.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{recipe.likes}</span>
                  </div>
                </div>

                <button className="w-full rounded-lg bg-gray-100 py-3 font-medium text-gray-700 transition-colors hover:bg-red-500 hover:text-white">
                    Ver Receita
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}