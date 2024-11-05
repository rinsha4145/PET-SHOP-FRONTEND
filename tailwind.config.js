/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        arial: ['Arial', 'sans-serif'],
        helvetica: ['Helvetica', 'sans-serif'],
        'times-new-roman': ['"Times New Roman"', 'serif'],
        georgia: ['Georgia', 'serif'],
        verdana: ['Verdana', 'sans-serif'],
        tahoma: ['Tahoma', 'sans-serif'],
        courier: ['"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}

