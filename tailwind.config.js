export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-app': 'var(--bg-app)',
        'bg-surface': 'var(--bg-surface)',
        'border-subtle': 'var(--border-subtle)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        'primary-500': 'var(--primary-500)',
        'primary-600': 'var(--primary-600)',
        'alert-critical': 'var(--alert-critical)',
        'alert-warning': 'var(--alert-warning)',
        'alert-info': 'var(--alert-info)',
        'success': 'var(--success)',
        'ia-highlight': 'var(--ia-highlight)'
      },
    },
  },
  plugins: [],
}
