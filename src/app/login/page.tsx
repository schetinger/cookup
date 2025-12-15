"use client"; 

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"; // Usamos ícones do Lucide (melhor que Font Awesome)
import Image from "next/image"; // Mantemos a importação por boas práticas

// Importações dos seus assets e estilos
import styles from "~/styles/sec3.module.css";
import pasta from "~/assets/images/pasta.jpg";
import salad from "~/assets/images/salad.jpg";

// Exportamos como default, que é o padrão para páginas do Next.js
export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    
    // NOTA: Os metadados (title, viewport) foram removidos daqui.
    // Eles devem ser configurados no arquivo `layout.tsx` ou em `metadata` na página.

    // Função de submissão (A ser completada com a lógica de cadastro no TRPC/Next-Auth)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Formulário de Cadastro Submetido!");
        // *** FUTURO: Adicionar lógica de cadastro do usuário e senha aqui ***
    };


    return (
        <div 
            className={`${styles.bodyCadastro} h-screen flex items-center justify-center`}
            style={{ backgroundImage: `url(${salad.src})` }}
        >
            <div className={styles.containerCadastro}>
                
                {/* Lado Esquerdo - Visual Area */}
                <div 
                    className={styles.visualArea} 
                    style={{ backgroundImage: `url(${pasta.src})` }} // Aqui você pode usar o componente Next/Image se quiser.
                >
                    <h1 className={styles.visualTitle}>Seu Ingresso para o Paraíso Culinário.</h1>
                    <p className={styles.visualSubtitle}>Junte-se a nós e compartilhe suas melhores criações!</p>
                </div>

                {/* Lado Direito - Form Area */}
                <div className={styles.formArea}>

                    <h2 className={styles.formLogo}>CookUp</h2>
                    <h3 className={styles.formSubtitle}>Ache novas ideias para experimentar</h3>

                    <form onSubmit={handleSubmit} className={styles.formContent}>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.formLabel}>Email</label>
                            <input type="email" id="email" name="email" required className={styles.formInput} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.formLabel}>Senha</label>
                            <div className={styles.inputPassword}>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password" 
                                    name="password" // Nome alterado para 'password' (padrão)
                                    required 
                                    className={styles.formInput} 
                                />
                                
                                {/* BOTÃO DE TOGGLE DE SENHA - Agora funcional com useState */}
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
                            <p className={styles.inputTip}>Use 8 ou mais letras, números e símbolos</p>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="data_nasc" className={styles.formLabel}>Data de nascimento</label>
                            <input type="date" id="data_nasc" name="data_nasc" required className={styles.formInput} />
                        </div>

                        <button type="submit" className={styles.btnPrimary}>
                            Continuar
                        </button>

                        <div className={styles.separator}>
                            <div className={styles.line}></div>
                            <span className={styles.text}>OU</span>
                            <div className={styles.line}></div>
                        </div>

                        <button type="button" className={styles.btnSecondary}>
                            <span>G</span>
                            <span>Continuar com o Google</span>
                        </button>

                        <p className={styles.formTerms}>
                            Ao continuar, você concorda com os
                            <a href="#" className={styles.linkTerms}>Termos de Serviço</a> e confirma que leu nossa
                            <a href="#" className={styles.linkTerms}>Política de Privacidade</a>.
                        </p>
                        <div className={styles.formFooter}>
                            <p>Já tem uma conta?
                                {/* Usamos o Link do Next.js para navegação */}
                                <Link href="/login" className={styles.linkLogin}>Entrar</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}