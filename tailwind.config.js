/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        dark: {
          bg: '#07090e',
          card: '#0d111a',
          cardHover: '#131926',
          border: '#1f293d',
          borderLight: '#2c3a54',
          input: '#0a0e16',
        },
        accent: {
          cyan: '#06b6d4',
          purple: '#a855f7',
          pink: '#ec4899',
          emerald: '#10b981',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'wave': 'wave 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 15px rgba(124, 58, 237, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(124, 58, 237, 0.7), 0 0 50px rgba(6, 182, 212, 0.3)' },
        },
        wave: {
          '0%': { height: '10%' },
          '100%': { height: '100%' },
        }
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))',
        'mesh-glow': 'radial-gradient(at 10% 20%, rgba(124, 58, 237, 0.15) 0px, transparent 50%), radial-gradient(at 90% 10%, rgba(6, 182, 212, 0.12) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(236, 72, 153, 0.08) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
}
