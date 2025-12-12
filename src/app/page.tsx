import { HeroSection } from "./_components/hero-section";
import { RecipeGrid } from "./_components/recipe-grid";
import { SignupSection } from "./_components/signup-section";

export default async function Home() {
  return (
    // Estrutura limpa: w-full e flex-col. O Layout Global já cuida do resto.
    <div className="w-full flex flex-col bg-white">
      
      {/* 1. Capa (Hero) */}
      <HeroSection />
      
      {/* 2. Lista de Receitas */}
      <RecipeGrid />

      {/* 3. Área de Cadastro */}
      <SignupSection />

    </div>
  );
}