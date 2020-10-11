module.exports = {
    theme: {
      container: {
        center: true,
        padding: '1rem'
      },
    },
    variants: {},
    plugins: [
    //   require('@tailwindcss/typography')
    ],
    purge: {
      enabled: process.env.NODE_ENV === 'production',
      content: [
        "./src/components/**/*.vue",
        "./src/layouts/**/*.vue",
        "./src/pages/**/*.vue",
      ],
      options: {
        whitelist: [],
        whitelistPatternsChildren: []
      }
    }
  }
  