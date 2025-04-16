import { terser } from "rollup-plugin-terser"; // Plugin para minificar o código
import resolve from "@rollup/plugin-node-resolve"; // Para resolver módulos Node.js
import commonjs from "@rollup/plugin-commonjs"; // Para converter CommonJS em ESM

export default {
  input: "src/index.js", // Arquivo de entrada principal
  output: [
    {
      file: "dist/my-library.cjs.js", // Saída no formato CommonJS
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/my-library.esm.js", // Saída no formato ES Modules
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/my-library.umd.js", // Saída no formato UMD para navegadores
      format: "umd",
      name: "MyLibrary", // Nome para o objeto global (ex.: window.MyLibrary)
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(), // Permite importar módulos do node_modules
    commonjs(), // Suporte a pacotes CommonJS
    terser(), // Minifica o código para produção
  ],
};
