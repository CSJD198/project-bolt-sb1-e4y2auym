/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom color palette based on your specifications
        'primary-text': '#ffffff',
        'secondary-text': '#d1d5db',
        'card': 'rgba(255, 255, 255, 0.05)',
        'card-border': 'rgba(255, 255, 255, 0.1)',
        'primary-btn': '#4f46e5',
        'secondary-btn': '#3b82f6',
        'accent': '#22c55e',
        'main-gradient': 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #0f172a 100%)',
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #0f172a 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'primary-gradient': 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
        'accent-gradient': 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
        'mesh-gradient': `
          radial-gradient(circle at 20% 80%, rgba(79, 70, 229, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
        `,
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'particle-float': 'particle-float 8s infinite linear',
        'border-slide': 'border-slide 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(79, 70, 229, 0.3)',
        'glow-accent': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};