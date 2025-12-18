"use client";

import { signIn } from "next-auth/react";

export function SignupSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100">
          <div className="grid lg:grid-cols-2">
            
            {/* Lado Esquerdo - Imagem da Carbonara */}
            <div
              className="relative hidden lg:flex flex-col justify-center items-center p-12 text-white"
              style={{
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

            {/* Lado Direito - Área de Login Real */}
            <div className="p-8 lg:p-12 flex items-center justify-center">
              <div className="w-full max-w-md space-y-8 text-center lg:text-left">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Junte-se ao CookUp</h2>
                  <p className="text-gray-500">
                    Use sua conta do Google para entrar instantaneamente, salvar receitas e interagir com a comunidade.
                  </p>
                </div>

                {/* BOTÃO ÚNICO DO GOOGLE */}
                <div className="space-y-4">
                  <button 
                    onClick={() => signIn("google", { callbackUrl: "/perfil" })}
                    className="w-full h-14 flex items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-white text-gray-700 font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
                  >
                    {/* Ícone Simples do Google */}
                    <svg className="w-6 h-6" viewBox="0 0 48 48">
                      <path fill="#ea4335ff" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    Continuar com o Google
                  </button>

                  <p className="text-xs text-center text-gray-400 px-8">
                    Ao continuar, você aceita nossos Termos de Serviço e Política de Privacidade.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}