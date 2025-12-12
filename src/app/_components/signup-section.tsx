"use client";

export function SignupSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100">
          <div className="grid lg:grid-cols-2">
            
            {/* MUDANÇA AQUI: Usando a imagem da Carbonara */}
            <div
              className="relative hidden lg:flex flex-col justify-center items-center p-12 text-white"
              style={{
                // Note que o nome do arquivo tem espaços e acentos, tem que ser exato
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/images/Pasta Carbonara Clássica.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="max-w-md space-y-4 text-center">
                <h2 className="text-4xl font-bold font-serif">Seu Ingresso para o Paraíso Culinário</h2>
                <p className="text-lg text-white/90">Junte-se a nós e compartilhe suas melhores criações!</p>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex items-center justify-center">
              <div className="w-full max-w-md space-y-6">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Junte-se ao CookUp</h2>
                  <p className="text-gray-500">Crie sua conta para salvar e postar receitas.</p>
                </div>

                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="seu@email.com" className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700" htmlFor="password">Senha</label>
                    <input id="password" type="password" placeholder="••••••••" className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" />
                  </div>
                  <button type="submit" className="w-full h-12 rounded-lg bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition-colors shadow-lg">
                    Continuar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}