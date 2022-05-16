/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
