import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const profileRouter = createTRPCRouter({
  getProfileData: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        username: true,
        nickname: true, 
        role: true,     
        bio: true,
        createdAt: true,
      },
    });

    // Mudança: Usar TRPCError em vez de Error comum para o frontend entender melhor
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Usuário não encontrado no banco de dados.",
      });
    }
    
    return user;
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
        username: z.string().min(3, "O username deve ter pelo menos 3 caracteres"),
        nickname: z.string().optional().nullable(), // Ajustado para aceitar nulo do banco
        bio: z.string().max(255, "A bio deve ter no máximo 255 caracteres").optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: {
            name: input.name,
            username: input.username,
            nickname: input.nickname,
            bio: input.bio,
          },
        });
      } catch (error: any) {
        // Tratamento para caso o username já exista (P2002 é o código do Prisma para Unique Constraint)
        if (error.code === 'P2002') {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Este nome de usuário já está em uso.",
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao atualizar o perfil.",
        });
      }
    }),
});