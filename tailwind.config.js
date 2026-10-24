/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          dark: '#08020f',
          midnight: '#0f051d',
          wine: '#240727',
          rose: '#e11d48',
          pink: '#f43f5e',
          softPink: '#fda4af',
          blush: '#ffe4e6',
          gold: '#fbbf24',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        handwriting: ['"Great Vibes"', 'cursive'],
        casual: ['Caveat', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.4s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(244, 63, 94, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(244, 63, 94, 0.8))' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
