/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--primary-50) / <alpha-value>)',
          100: 'rgb(var(--primary-100) / <alpha-value>)',
          200: 'rgb(var(--primary-200) / <alpha-value>)',
          300: 'rgb(var(--primary-300) / <alpha-value>)',
          400: 'rgb(var(--primary-400) / <alpha-value>)',
          500: 'rgb(var(--primary-500) / <alpha-value>)',
          600: 'rgb(var(--primary-600) / <alpha-value>)',
          700: 'rgb(var(--primary-700) / <alpha-value>)',
          800: 'rgb(var(--primary-800) / <alpha-value>)',
          900: 'rgb(var(--primary-900) / <alpha-value>)',
          950: 'rgb(var(--primary-950) / <alpha-value>)',
        },
        surface: {
          light: '#fdfbff',
          dark: '#141218',
        },
        surfaceContainer: {
          light: '#f3edf7',
          dark: '#211f26',
        },
        surfaceContainerHighest: {
          light: '#e6e0e9',
          dark: '#36343b',
        },
        onSurface: {
          light: '#1d1b20',
          dark: '#e6e0e9',
        },
        onSurfaceVariant: {
          light: '#49454f',
          dark: '#cac4d0',
        },
        outline: {
          light: '#79747e',
          dark: '#938f99',
        },
        outlineVariant: {
          light: '#cac4d0',
          dark: '#49454f',
        }
      }
    },
  },
  plugins: [],
}