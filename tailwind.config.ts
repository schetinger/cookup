import { type Config } from "tailwindcss";
// Importamos o tema padrão para estender as fontes
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  // O 'content' garante que o Tailwind estilize seus arquivos .tsx
  content: [
    "./src/app/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/app/_components/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Conecta as fontes Geist do seu layout.tsx
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-geist-serif)", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        brand: {
          orange: "#EE6338",
          dark: "#1A1A1A",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
