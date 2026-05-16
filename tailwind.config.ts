import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#e0060d',
          foreground: '#f5f5f5',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--foreground)',
        },
        border: 'var(--border)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--foreground)',
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
