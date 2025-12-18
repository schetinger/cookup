import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  // Busca a última receita postada pelo usuário
  getLatest: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.postReceita.findFirst({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Busca todas as receitas do usuário para a grade estilo Pinterest
  getUserPosts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.postReceita.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Cria uma nova receita
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        imageUrl: z.string().optional(),
        ingredients: z.string().min(1),
        body: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.postReceita.create({
        data: {
          title: input.title,
          imageUrl: input.imageUrl,
          ingredients: input.ingredients,
          body: input.body,
          userId: ctx.session.user.id,
        },
      });
    }),

  // ADICIONE ESTA FUNÇÃO: Para resolver o erro de 'update'
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(), // ID como número para bater com o SQLite
        title: z.string().min(1),
        ingredients: z.string().min(1),
        body: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.postReceita.update({
        where: { id: input.id },
        data: {
          title: input.title,
          ingredients: input.ingredients,
          body: input.body,
        },
      });
    }),

  // ADICIONE ESTA FUNÇÃO: Para resolver o erro de 'delete'
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.postReceita.delete({
        where: { id: input.id },
      });
    }),
});