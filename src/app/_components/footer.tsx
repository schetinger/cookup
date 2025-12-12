"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const bgColor = "bg-[#FDFBF7]";
  const textColor = "text-[#6B5D52]";
  const headingColor = "text-[#3A3029]";
  const iconBgColor = "bg-[#EEE7DB]";
  const borderColor = "border-[#E6E0D6]";

  const footerLinks = {
    explorar: {
      title: "Explorar",
      links: ["Top Receitas", "Novas Receitas", "Categorias", "Chefs"],
    },
    sobre: {
      title: "Sobre",
      links: ["Sobre Nós", "Blog", "Contato", "Carreiras"],
    },
    legal: {
      title: "Legal",
      links: ["Termos de Serviço", "Política de Privacidade", "Cookies"],
    },
  };

  return (
    <footer className={`${bgColor} ${textColor} border-t ${borderColor}`}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.jpeg" alt="CookUp" width={50} height={50} className="rounded-lg object-cover" />
              <span className={`font-serif text-2xl font-bold ${headingColor}`}>CookUp</span>
            </Link>
            <p className="max-w-xs text-base leading-relaxed">
              Compartilhe e descubra as melhores receitas com uma comunidade apaixonada por gastronomia.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBgColor} text-[#6B5D52] transition-all duration-300 hover:bg-[#DCCEB9] hover:scale-105`}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>

          {Object.values(footerLinks).map((section) => (
            <div key={section.title} className="flex flex-col space-y-5">
              <h3 className={`font-serif text-xl font-semibold ${headingColor}`}>
                {section.title}
              </h3>
              <ul className="flex flex-col space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-base transition-colors duration-200 hover:text-[#A33D32]">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={`border-t ${borderColor} py-8`}>
        <p className="text-center text-base">
          &copy; {new Date().getFullYear()} CookUp. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}