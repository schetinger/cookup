import styles from '~/styles/sec3.module.css';
import pasta from '~/assets/images/pasta.jpg';
import React from 'react';
import salad from '~/assets/images/salad.jpg'
import Image from 'next/image';
export function Sec3({ className }: { className: string }) {
    return (
        <div className={`${styles.bodyCadastro} ${className} overflow-hidden`}style={{ backgroundImage: `url(${salad.src})` }}>

            <div>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Cadastro - CookUp | Crie sua Conta</title>
                <link rel="stylesheet" href='~/styles/sec3.module.css'/> 
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
            </div>
            <div className={styles.containerCadastro}>
                <div className={styles.visualArea} style={{ backgroundImage: `url(${pasta.src})` }}>
                    <h1 className={styles.visualTitle}>Seu Ingresso para o Paraíso Culinário.</h1>
                    <p className={styles.visualSubtitle}>Junte-se a nós e compartilhe suas melhores criações!</p>
                </div>

                <div className={styles.formArea}>

                    <h2 className={styles.formLogo}>CookUp</h2>
                    <h3 className={styles.formSubtitle}>Ache novas ideias para experimentar</h3>

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
                                    { }
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
                                <a href="login.html" className={styles.linkLogin}>Entrar</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}