import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/my-library.js",
      format: "umd",
      name: "MyLibrary"
    },
    {
      file: "dist/my-library.esm.js",
      format: "esm"
    }
  ],
  plugins: [terser()]
};
