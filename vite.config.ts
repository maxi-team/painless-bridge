import { promises } from 'fs';
import { dirname } from 'path';
import { defineConfig } from 'vite';
import { default as dts } from 'vite-plugin-dts';

let chunks = 1;

export default defineConfig({
  plugins: [
    dts({
      staticImport: true,
      clearPureImport: true,
      entryRoot: './src',
      include: './src/**/*.{ts,js}',
      beforeWriteFile(filePath, content) {
        promises.mkdir(dirname(filePath), { recursive: true }).then(() => {
          promises.writeFile(
            filePath.replace('.d.ts', '.d.mts'),
            content.replaceAll('.js', '.mjs'),
            { encoding: 'utf8' }
          );
        });

        return {
          filePath,
          content
        };
      }
    })
  ],
  appType: 'custom',
  build: {
    minify: true,
    sourcemap: 'hidden',
    outDir: 'lib',
    emptyOutDir: true,
    lib: {
      entry: {
        index: './src/index.ts',
        plugins: './src/plugins/index.ts'
      },
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      output: {
        exports: 'named',
        chunkFileNames: () => chunks-- ? 'shared.mjs' : 'shared.js'
      }
    },
    target: [
      'firefox55',
      'chrome57'
    ]
  },
  esbuild: {
    charset: 'utf8'
  }
});
