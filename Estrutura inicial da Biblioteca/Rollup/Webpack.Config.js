const path = require("path");

module.exports = {
  entry: "./src/index.js", // Arquivo de entrada principal
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-library.js", // Nome do arquivo de saída
    library: "MyLibrary", // Nome para o objeto global (ex.: window.MyLibrary)
    libraryTarget: "umd", // Formato de saída (UMD para navegadores e Node.js)
  },
  mode: "production", // Configuração de produção (minificação automática)
  module: {
    rules: [
      {
        test: /\.js$/, // Aplica a regra para todos os arquivos .js
        exclude: /node_modules/, // Exclui a pasta node_modules
        use: {
          loader: "babel-loader", // Usa Babel para transpilar o código
          options: {
            presets: ["@babel/preset-env"], // Preset para compatibilidade com ES5+
          },
        },
      },
    ],
  },
  devtool: "source-map", // Gera map de fontes para debug
};
