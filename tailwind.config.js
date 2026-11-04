/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#F7F1FA',
          100: '#F1E7F8',
          200: '#DCC6EA',
          300: '#B98FD0',
          400: '#8A56A8',
          500: '#5E2A7E',
          600: '#4B1D66',
          700: '#35104F',
          800: '#2A0D3F',
          900: '#1E0B2D',
        },
        accent: {
          50: '#FFF1F3',
          100: '#FFD9DF',
          200: '#FDA9B6',
          300: '#F57A8F',
          400: '#EE5A74',
          500: '#E63959',
          600: '#CC2A4A',
          700: '#A81F3B',
          800: '#861A30',
          900: '#5E1222',
        },
        secondary: {
          50: '#FFFAFB',
          100: '#FFF1F3',
          200: '#FFE0E6',
          300: '#FFC7D1',
          400: '#F7A3B3',
          500: '#EC7C93',
          600: '#D85C76',
        },
        success: {
          50: '#ECFDF3',
          500: '#17A36A',
          700: '#0E6B47',
        },
        warning: {
          50: '#FFF8E6',
          500: '#E9A100',
          700: '#9A6700',
        },
        error: {
          50: '#FEF2F2',
          500: '#D92D20',
          700: '#B42318',
        },
        ink: {
          50: '#FAF8FB',
          100: '#F3EFF5',
          200: '#E4DDE8',
          300: '#C9BFCF',
          400: '#9A8DA3',
          500: '#6E6078',
          600: '#54475E',
          700: '#3D3247',
          800: '#2D2236',
          900: '#24152C',
        },
      },
      boxShadow: {
        soft: '0 20px 50px -20px rgba(53, 16, 79, 0.35)',
        glow: '0 0 60px -10px rgba(230, 57, 89, 0.45)',
        card: '0 10px 30px -12px rgba(36, 21, 44, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        'rise-heart': {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '0' },
          '20%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-160px) scale(1.1)', opacity: '0' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.9) translateY(8px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'rise-heart': 'rise-heart 5s ease-in infinite',
        'pop-in': 'pop-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
