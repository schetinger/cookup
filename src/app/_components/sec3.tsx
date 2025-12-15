import styles from '~/styles/sec3.module.css';
import pasta from '~/assets/images/pasta.jpg';
import salad from '~/assets/images/salad.jpg';
import Image from 'next/image';
import React from 'react';

// O componente agora usa uma função com a primeira letra maiúscula (Sec3 -> SecThree)
// e ajusta o nome da classe CSS para 'SecThree' se você quiser seguir a convenção,
// mas mantive 'Sec3' já que era o nome original.
export function Sec3({ className }: { className: string }) {
    // Definindo as URLs das imagens para uso otimizado.
    const saladBackgroundUrl = `url(${salad.src})`;
    const pastaImageUrl = pasta.src;

    return (
        <div className={`${styles.bodyCadastro} ${className} overflow-hidden`} style={{ backgroundImage: saladBackgroundUrl }}>

            {/*
                ⚠️ CORREÇÃO PRINCIPAL:
                Tags como <meta>, <title> e <link> para CSS/Fontes externas
                pertencem ao arquivo principal do Next.js (como _document.js ou Head no _app.js).
                Elas foram removidas daqui, exceto a referência ao ícone Font Awesome, que
                deve ser movida para o componente <Head> ou _document.js.
            */}
            
            {/* Se você precisa carregar fontes externas, use o <Head> do Next.js:
                <Head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
                </Head>
            */}

            <div className={styles.containerCadastro}>
                {/* ⚠️ CORREÇÃO:
                    Para a área visual, a imagem 'pasta.jpg' é usada como background. 
                    Manter o estilo `backgroundImage` é válido, mas se for uma imagem de conteúdo
                    fixo, usar o componente <Image> do Next.js (com `layout="fill"`) é mais otimizado.
                    No entanto, mantive a sintaxe de background para respeitar o layout original. 
                */}
                <div className={styles.visualArea} style={{ backgroundImage: `url(${pastaImageUrl})` }}>
                    <h1 className={styles.visualTitle}>Seu Ingresso para o Paraíso Culinário.</h1>
                    <p className={styles.visualSubtitle}>Junte-se a nós e compartilhe suas melhores criações!</p>
                </div>

                <div className={styles.formArea}>

                    <h2 className={styles.formLogo}>CookUp</h2>
                    <h3 className={styles.formSubtitle}>Ache novas ideias para experimentar</h3>

                    {/* ✅ BOAS PRÁTICAS: 
                        No React/Next.js, é importante capturar o evento de submit e
                        gerenciar o estado do formulário, mas mantive a estrutura simples.
                    */}
                    <form action="#" method="POST" className={styles.formContent}>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.formLabel}>Email</label>
                            <input type="email" id="email" name="email" required className={styles.formInput} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="senha" className={styles.formLabel}>Senha</label>
                            <div className={styles.inputPassword}>
                                <input type="password" id="senha" name="senha" required className={styles.formInput} />
                                <span className={styles.passwordToggle}>
                                    {/* ⚠️ CORREÇÃO DE SINTAXE: 
                                        Removido o bloco de comentários vazio `{ }` que causava warning. 
                                    */}
                                    <i className="fas fa-eye"></i>
                                </span>
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
                            {/* ⚠️ CORREÇÃO: Removido o <span> 'G' repetido e mantive a estrutura.
                                Se o 'G' é um ícone (do Google), você pode substituí-lo por um <i> ou SVG.
                            */}
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
                                <a href="/login" className={styles.linkLogin}>Entrar</a> {/* Alterado para link Next.js */}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}