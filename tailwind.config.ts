import type { Config } from 'tailwindcss'
 
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
     './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "color-0": "var(--color-0)",
        "color-1": "var(--color-1)",
        "color-2": "var(--color-2)",
        "color-3": "var(--color-3)",
        "color-4": "var(--color-4)",
        "color-5": "var(--color-5)",
        "color-6": "var(--color-6)",
        "color-7": "var(--color-7)",
        "color-8": "var(--color-8)",
        "color-9": "var(--color-9)",
        "color-10": "var(--color-10)",
        "color-11": "var(--color-11)"
      },
    },
  },
  plugins: [],
} satisfies Config