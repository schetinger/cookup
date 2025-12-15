/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import path from "path";

/** @type {import("next").NextConfig} */
const config = {
  // Adiciona a configuração do Webpack para resolver o alias de caminho (path alias)
  webpack: (config, { isServer }) => {
    // Configura o alias ~ para apontar para o diretório src
    config.resolve.alias["~"] = path.join(__dirname, "src");

    return config;
  },
};

export default config;