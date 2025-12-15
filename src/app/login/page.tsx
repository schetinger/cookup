"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import styles from "~/styles/sec3.module.css";
import pasta from "~/assets/images/pasta.jpg";
import salad from "~/assets/images/salad.jpg";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsPending(false);

    if (result?.error) {
      setError("Email ou senha inválidos. Tente novamente.");
      return;
    }

    if (result?.ok) {
      router.push("/profile");
    }
  };

  return (
    <div
      className={`${styles.bodyCadastro} h-screen overflow-hidden`}
      style={{ backgroundImage: `url(${salad.src})` }}
    >
      <div className={styles.containerCadastro}>
        <div
          className={styles.visualArea}
          style={{ backgroundImage: `url(${pasta.src})` }}
        >
          <h1 className={styles.visualTitle}>Bem-vindo de Volta, Chef!</h1>
          <p className={styles.visualSubtitle}>
            Entre para continuar compartilhando e descobrindo receitas.
          </p>
        </div>

        <div className={styles.formArea}>
          <h2 className={styles.formLogo}>CookUp</h2>
          <h3 className={styles.formSubtitle}>Acesse sua conta</h3>

          <form onSubmit={handleSubmit} className={styles.formContent}>
            {error && (
              <div className="text-red-600 text-sm p-2 border border-red-300 rounded mb-4">
                {error}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Senha
              </label>

              <div className={styles.inputPassword}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className={styles.formInput}
                />

                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Esconder senha" : "Mostrar senha"
                  }
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={isPending}
            >
              {isPending ? "Entrando..." : "Entrar"}
            </button>

            <div className={styles.separator}>
              <div className={styles.line}></div>
              <span className={styles.text}>OU</span>
              <div className={styles.line}></div>
            </div>

            <button
              type="button"
              className={styles.btnSecondary}
              disabled={isPending}
              onClick={() => signIn("google", { callbackUrl: "/profile" })}
            >
              <span>G</span>
              <span>Continuar com o Google</span>
            </button>

            <div className={styles.formFooter}>
              <p>
                Não tem uma conta?
                <Link href="/register" className={styles.linkLogin}>
                  Cadastre-se
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
