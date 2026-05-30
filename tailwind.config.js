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