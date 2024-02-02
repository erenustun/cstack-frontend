module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      },
      colors: {
        'danger': 'var(--danger-background)',
        'default': 'var(--base-background)',
        'default-text': 'var(--base-text)',
        'default-text-light': 'var(--base-text-light)',
        'foreground': 'var(--base-foreground)',
        'foreground-darker': 'var(--base-foreground-darker)',
        'gray': 'var(--gray-background)',
        'header': 'var(--header-background)',
        'loading': 'var(--loading-background)',
        'primary': 'var(--primary-background)',
        'primary-text': 'var(--primary-text)',
        'success': 'var(--success-background)',
        'warning': 'var(--warning-background)',

        'base-active': 'var(--base-active)',
        'danger-active': 'var(--danger-active)',
        'primary-active': 'var(--primary-active)',
        'success-active': 'var(--success-active)',
        'warning-active': 'var(--warning-active)',

        'base-hover': 'var(--base-hover)',
        'danger-hover': 'var(--danger-hover)',
        'primary-hover': 'var(--primary-hover)',
        'success-hover': 'var(--success-hover)',
        'warning-hover': 'var(--warning-hover)',

        'secondary': 'var(--secondary)',
      },
      height: {
        'header': 'calc(clamp(4.26667rem, calc(4.26667rem + (8) * ((100vw - 1200px) / (1440 - 1200))), 4.8rem) + 24px)'
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
        '11xl': '112rem',
        'left-sidebar': '13rem',
        'right-sidebar': '22rem',
      },
      textColor: {
        disabled: 'var(--disabled-text)',
      },
      width: {
      },
    },
  },
  plugins: [],
}
