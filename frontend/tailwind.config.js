/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#061325',
          900: '#0B2545',
          800: '#133E68',
          700: '#1D4ED8',
          600: '#2563EB',
          500: '#3B82F6',
          400: '#60A5FA',
          300: '#93C5FD',
          200: '#BFDBFE',
          100: '#DBEAFE',
          50: '#EFF6FF',
        },
        gold: {
          700: '#92400E',
          600: '#D97706',
          500: '#F59E0B',
          400: '#FBBF24',
          300: '#FCD34D',
          200: '#FDE68A',
          100: '#FEF3C7',
        },
        good: {
          700: '#047857',
          600: '#059669',
          500: '#10B981',
          100: '#D1FAE5',
        },
        bad: {
          700: '#B91C1C',
          600: '#DC2626',
          500: '#EF4444',
          100: '#FEE2E2',
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
