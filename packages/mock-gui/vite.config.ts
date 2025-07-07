import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dfs from 'vite-plugin-dts';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import istanbul from 'vite-plugin-istanbul';
import flowbiteReact from 'flowbite-react/plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'LOGIALL_MOCK_GUI',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    tailwindcss(),
    react(),
    dfs({ tsconfigPath: './tsconfig.app.json' }),
    istanbul({
      cypress: true,
      requireEnv: false,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['node_modules', 'cypress/'],
    }),
    flowbiteReact(),
  ],
  server: {
    port: 4000,
  },
});
