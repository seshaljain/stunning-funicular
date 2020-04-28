module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sans': [
          '-apple-system',
          'BlinkMacSystemFont',
          "Segoe UI",
          "Roboto",
          "Helvetica Neue", 'Arial', 'sans-serif']
      }
    }
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ]
}