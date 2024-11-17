/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensures Tailwind scans your source files
  theme: {
    extend: {
      colors: {
        orange: '#d97706', // Adds your custom orange while keeping Tailwind's default palette
      },
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
};
