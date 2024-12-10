import type { Config } from 'tailwindcss';
import lineClamp from '@tailwindcss/line-clamp';

const config: Config = {
  darkMode: 'class', // Enable dark mode
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50', // Your brand color
      },
      objectPosition: {
        'near-top': 'center 30%',
      },
    },
    plugins: [lineClamp],
  },
};
export default config;
