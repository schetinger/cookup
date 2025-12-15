// src/server/actions/auth.ts
"use server";

import * as z from "zod";
import * as bcrypt from "bcrypt";
import { db } from "~/server/db";
import { signIn } from "~/server/auth"; 
import { redirect } from "next/navigation";

// Definição do Schema de Validação
const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email inválido.",
  }),
  password: z.string().min(8, {
    message: "A senha deve ter no mínimo 8 caracteres.",
  }),
});

/**
 * Server Action para registrar um novo usuário com credenciais (email e senha).
 */
export async function registerUser(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Erro de validação:", validatedFields.error.flatten());
    throw new Error("Dados de registro inválidos.");
  }

  const { email, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Este email já está cadastrado.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      passwordHash: hashedPassword, 
      name: "Novo Usuário", 
    },
  });

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/profile", 
    });
  } catch (error) {
    if ((error as Error).message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    throw new Error("Usuário criado, mas o login automático falhou.");
  }

  redirect("/profile");
}