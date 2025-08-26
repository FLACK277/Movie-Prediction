module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#7c3aed',
          500: '#7c3aed',
          600: '#6d28d9',
        },
      },
      boxShadow: {
        depth: '0 12px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
        glow: '0 0 0 1px rgba(124,58,237,0.35), 0 10px 30px -10px rgba(124,58,237,0.45)'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}