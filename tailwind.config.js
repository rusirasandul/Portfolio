/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07070b',
          900: '#0b0b12',
          850: '#101019',
          800: '#15151f',
          700: '#1c1c28',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          dark: '#6d28d9',
        },
        iris: '#6366f1',
        sky: {
          glow: '#38bdf8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(139, 92, 246, 0.45)',
        'glow-sm': '0 0 20px -6px rgba(139, 92, 246, 0.4)',
        card: '0 8px 30px -12px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'grid-faint':
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        'radial-fade':
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.12), transparent 70%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '50%': { transform: 'translate(20px, -20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '0.2' },
          '100%': { transform: 'scale(0.9)', opacity: '0.5' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 12s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'pulse-ring': 'pulse-ring 3s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
