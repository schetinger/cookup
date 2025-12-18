"use client"; 

import React from "react";
import { signIn } from "next-auth/react"; // Importação correta para componentes client-side
import Image from "next/image";

// Importações dos seus assets e estilos conforme sua estrutura de pastas
import styles from "~/styles/sec3.module.css";
import pasta from "~/assets/images/pasta.jpg";
import salad from "~/assets/images/salad.jpg";

export default function LoginPage() {
    return (
        <div 
            className={`${styles.bodyCadastro} h-screen flex items-center justify-center`}
            style={{ backgroundImage: `url(${salad.src})` }}
        >
            <div className={styles.containerCadastro}>
                
                {/* Lado Esquerdo - Área Visual */}
                <div 
                    className={styles.visualArea} 
                    style={{ backgroundImage: `url(${pasta.src})` }}
                >
                    <h1 className={styles.visualTitle}>Seu Ingresso para o Paraíso Culinário.</h1>
                    <p className={styles.visualSubtitle}>Junte-se a nós e compartilhe suas melhores criações!</p>
                </div>

                {/* Lado Direito - Área de Login */}
                <div className={styles.formArea}>

                    <h2 className={styles.formLogo}>CookUp</h2>
                    <h3 className={styles.formSubtitle}>Ache novas ideias para experimentar</h3>

                    <div className={styles.formContent}>
                        
                        <div className="py-8">
                            <button 
                                type="button" 
                                className={styles.btnSecondary}
                                onClick={() => signIn("google", { callbackUrl: "/perfil" })}
                            >
                                {/* Ícone do Google estilizado */}
                                <span className="mr-2 font-bold text-blue-600">G</span>
                                <span>Continuar com o Google</span>
                            </button>
                        </div>

                        <p className={styles.formTerms}>
                            Ao continuar, você concorda com os
                            <a href="#" className={styles.linkTerms}> Termos de Serviço</a> e confirma que leu nossa
                            <a href="#" className={styles.linkTerms}> Política de Privacidade</a>.
                        </p>

                        <div className={styles.formFooter}>
                            <p className="text-sm text-gray-500">
                                O CookUp usa sua conta do Google para uma experiência mais segura e rápida.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}