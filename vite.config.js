import path, { resolve } from "node:path";
import { defineConfig } from 'vite';
import * as glob from 'glob';
import htmlPurge from 'vite-plugin-purgecss';
import handlebars from 'vite-plugin-handlebars';
import { footer } from './data/common/footer.js';

const obtenerEntradasHTML = () => {
  return Object.fromEntries(
    [
      ...glob.sync('./**/*.html', {
        ignore: ["./dist/**", "./node_modules/**"]
      }).map(
        fileData => [
          fileData.slice(0, fileData.length - path.extname(fileData).length),
          resolve(__dirname, fileData)
        ]
      )
    ]
  );
};

export default defineConfig({
  appType: 'mpa',
  base: '/IACON_HN/', 
  build: {
    rollupOptions: {
      input: obtenerEntradasHTML()
    }
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'partials'),
      context: () => footer 
    }),
    htmlPurge({})
  ]
});
