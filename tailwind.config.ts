import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#f5f5f5',
        primary: {
          DEFAULT: '#e0060d',
          foreground: '#f5f5f5',
        },
        card: {
          DEFAULT: '#0d0d0d',
          foreground: '#f5f5f5',
        },
        border: '#1f1f1f',
        muted: {
          DEFAULT: '#1a1a1a',
          foreground: 'rgba(245,245,245,0.7)',
        },
        secondary: {
          DEFAULT: '#0d0d0d',
          foreground: '#f5f5f5',
        },
      },
      fontFamily: {
        heading: ['Oswald', 'system-ui', 'sans-serif'],
        body: ['Barlow', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
