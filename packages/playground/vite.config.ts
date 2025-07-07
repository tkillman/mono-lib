import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'mock-gui': path.resolve(__dirname, '../mock-gui/src'), // 개발 중이면 src 직접 alias
    },
  },
  server: {
    fs: {
      // 👇 Vite dev 서버가 mock-gui 디렉토리 접근을 허용하게 만듦
      allow: [
        '..', // or more specific: path.resolve(__dirname, '../mock-gui')
      ],
    },
  },
});
