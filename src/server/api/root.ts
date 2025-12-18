import { postRouter } from "~/server/api/routers/post"; // Importante para as receitas!
import { profileRouter } from "~/server/api/routers/profile"; 
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * Este é o roteador principal do seu servidor.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,      // Mantém as funcionalidades de receitas
  profile: profileRouter, // Adiciona as funcionalidades de perfil
});

// export type definition of API
export type AppRouter = typeof appRouter;