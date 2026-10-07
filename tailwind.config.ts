import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: '#0A3D91',
            dark: '#072E6F',
            light: '#1B52B3',
            50: '#EDF3FC',
            100: '#D6E4F9',
          },
          navy: {
            DEFAULT: '#061B4B',
            dark: '#030E29',
            light: '#0D2B6E',
            surface: '#0A225C',
          },
          yellow: {
            DEFAULT: '#FDB913',
            hover: '#E5A40B',
            light: '#FED564',
            50: '#FEF9E7',
          },
          dark: '#0A0A0A',
          gray: {
            DEFAULT: '#525B6C',
            light: '#8A94A6',
            border: '#E2E8F0',
          },
          light: '#F4F6FA',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'Barlow', 'sans-serif'],
        sans: ['Inter', 'Montserrat', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 4px 20px -2px rgba(10, 61, 145, 0.08)',
        card: '0 10px 30px -4px rgba(6, 27, 75, 0.1)',
        elevated: '0 20px 40px -10px rgba(6, 27, 75, 0.18)',
        yellow: '0 8px 24px -4px rgba(253, 185, 19, 0.35)',
      },
      borderRadius: {
        brand: '14px',
      },
    },
  },
  plugins: [],
};

export default config;
