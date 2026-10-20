/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{html,js,jsx,ts,tsx,blade.php}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--fg-color-brand-primary)',
          'primary-hover': 'var(--fg-color-brand-primary-hover)',
          'primary-light': 'var(--fg-color-brand-primary-light)',
          navy: 'var(--fg-color-brand-navy)',
          sky: 'var(--fg-color-brand-sky)',
          cyan: 'var(--fg-color-brand-cyan)',
        },
        canvas: 'var(--fg-bg-canvas)',
        surface: {
          DEFAULT: 'var(--fg-bg-surface)',
          muted: 'var(--fg-bg-surface-muted)',
          inverse: 'var(--fg-bg-surface-inverse)',
          brand: 'var(--fg-bg-surface-brand)',
        },
        fg: {
          primary: 'var(--fg-text-primary)',
          secondary: 'var(--fg-text-secondary)',
          muted: 'var(--fg-text-muted)',
          inverse: 'var(--fg-text-inverse)',
        },
        border: {
          DEFAULT: 'var(--fg-border-default)',
          muted: 'var(--fg-border-muted)',
        }
      },
      borderRadius: {
        '2xl': 'var(--fg-radius-2xl)',
        '3xl': 'var(--fg-radius-3xl)',
        'full': 'var(--fg-radius-full)',
      },
      boxShadow: {
        card: 'var(--fg-card-shadow)',
        float: 'var(--fg-shadow-float)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
