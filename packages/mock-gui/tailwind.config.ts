import type { Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite-react/plugin/tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}',
    './.flowbite-react/class-list.json',
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideDownGo: 'slideDown 1s ease-out',
      },
    },
  },
  plugins: [flowbitePlugin],
};

export default config;
