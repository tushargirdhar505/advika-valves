import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#d9e2ee',
          200: '#b3c5dc',
          300: '#8da9ca',
          400: '#678db8',
          500: '#3e6da3',
          600: '#2b5383',
          700: '#1b3a62',
          800: '#0f2644',
          900: '#071526',
          950: '#040d18',
        },
        steel: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        brand: {
          blue: '#164e87',
          deep: '#0b1f38',
          accent: '#2563eb',
          light: '#eff6ff',
          border: '#e2e8f0',
        }
      },
    },
  },
  plugins: [],
};
export default config;
