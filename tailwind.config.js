/** @type {import('tailwindcss').Config} */
// 以前は index.html の <script>tailwind.config = {...}</script> に書かれていた設定。
// Play CDN（cdn.tailwindcss.com）をやめてビルド時にCSSを生成するため、ここへ移した。
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
        serif: ['"Noto Serif JP"', 'serif'],
      },
      colors: {
        brand: {
          dark: '#0f0f0f',   // Near-black
          gold: '#B45309',   // Unagi Sauce / Amber
          cream: '#FDFBF7',  // Rice paper
          gray: '#475569',
        },
      },
    },
  },
  plugins: [],
};
