
import { profileRouter } from "~/server/api/routers/profile"; // Importe o novo router
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * Este é o roteador principal do seu servidor.
 * Todas as rotas em /api/routers precisam ser adicionadas aqui.
 */
export const appRouter = createTRPCRouter({
  
  profile: profileRouter, // Adicione esta linha exatamente assim
});

// export type definition of API
export type AppRouter = typeof appRouter;