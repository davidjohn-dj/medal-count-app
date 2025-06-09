/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/types/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          50: '#f0f9ff',
          500: 'var(--primary)',
          600: '#5b21b6',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        gold: 'var(--gold)',
        silver: 'var(--silver)',
        bronze: 'var(--bronze)',
        olympic: {
          blue: 'var(--olympic-blue)',
          yellow: 'var(--olympic-yellow)',
          black: 'var(--olympic-black)',
          green: 'var(--olympic-green)',
          red: 'var(--olympic-red)',
          'blue-bright': 'var(--olympic-blue-bright)',
          'yellow-bright': 'var(--olympic-yellow-bright)',
          white: 'var(--olympic-white)',
          'green-bright': 'var(--olympic-green-bright)',
          'red-bright': 'var(--olympic-red-bright)',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-olympic': 'var(--gradient-olympic)',
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
      },
      borderRadius: {
        'theme-sm': 'var(--radius-sm)',
        'theme-md': 'var(--radius-md)',
        'theme-lg': 'var(--radius-lg)',
        'theme-xl': 'var(--radius-xl)',
        'theme-full': 'var(--radius-full)',
      },
      animation: {
        'bounce-subtle': 'bounce 2s infinite',
      },
      brightness: {
        25: '.25',
        125: '1.25',
      },
      scale: {
        '105': '1.05',
        '110': '1.1',
        '1005': '1.005',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'button': 'var(--shadow-button)',
        'medal': 'var(--shadow-medal)',
        'theme': 'var(--shadow-card)',
      }
    },
  },
  plugins: [],
} 