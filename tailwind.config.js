/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        work: ['"Work Sans"', 'Inter', 'Lato', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Liberation Sans', 'sans-serif'],
        sans: ['"Work Sans"', 'Inter', 'Lato', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Liberation Sans', 'sans-serif'],
        serif: ['"Work Sans"', 'Inter', 'Lato', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Liberation Sans', 'sans-serif'],
      },
      colors: {
        cipria: {
          50: '#FFF1F4',
          100: '#FBE3EA',
          200: '#F7CDD9',
          300: '#F2B6C8',
          400: '#EC9EB5',
          500: '#E786A4',
          600: '#DB6C8E',
          700: '#C45679',
          800: '#A84368',
          900: '#8D3555',
        },
      },
    },
  },
  plugins: [],
};
