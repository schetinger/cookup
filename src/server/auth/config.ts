import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google"; // Importado para o login social
import CredentialsProvider from "next-auth/providers/credentials"; // Provedor para e-mail/senha

import { db } from "~/server/db";
import * as bcrypt from "bcrypt"; // Necessário para verificar a senha

/**
 * Module augmentation for `next-auth` types.
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // Adicione aqui outros campos personalizados do usuário se necessário
      // role: UserRole; 
    } & DefaultSession["user"];
  }

  // interface User {
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    // 1. Provedor Discord (Login Social)
    DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    
    // 2. Provedor Google (Login Social)
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    // 3. Provedor Credenciais (E-mail e Senha)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 1. Encontrar o usuário pelo e-mail no banco de dados
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        // Retorna null se não encontrar ou se o usuário não tiver um hash de senha (ex: só logou socialmente)
        if (!user || !user.passwordHash) {
          return null; 
        }

        // 2. Comparar a senha
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        );

        if (passwordMatch) {
          // 3. Retorna o objeto de usuário (apenas os dados necessários)
          return { id: user.id, name: user.name, email: user.email };
        } else {
          return null; // Senha incorreta
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;