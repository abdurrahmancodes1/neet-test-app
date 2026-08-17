/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0F1A24',
          900: '#16232F',
          800: '#1E3140',
          700: '#2A4356',
          600: '#3C5A70',
          500: '#557A92',
          400: '#7FA0B4',
          300: '#ACC5D2',
          200: '#D4E2E9',
          100: '#EAF1F4',
          50: '#F5F9FA',
        },
        gold: {
          700: '#8A6416',
          600: '#A87C1D',
          500: '#C6952A',
          400: '#DBAE4E',
          300: '#EAC87F',
          200: '#F3DDAC',
          100: '#FAF0DA',
        },
        good: {
          700: '#1F6B4E',
          600: '#278560',
          500: '#33A177',
          100: '#DEF3E9',
        },
        bad: {
          700: '#8F2E2E',
          600: '#AE3838',
          500: '#C64848',
          100: '#FBE4E4',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 26, 36, 0.06), 0 4px 16px rgba(15, 26, 36, 0.06)',
        pop: '0 8px 30px rgba(15, 26, 36, 0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out',
        'rise-in': 'riseIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        riseIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
      },
    },
  },
  plugins: [],
};
