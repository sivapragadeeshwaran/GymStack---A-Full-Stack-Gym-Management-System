/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    // Colors & Backgrounds
    'bg-[#303030]',
    'text-white',
    'placeholder:text-[#ababab]',

    // Layout & Spacing
    'rounded-xl',
    'h-14',
    'w-full',
    'flex-1',
    'min-w-40',
    'max-w-[480px]',
    'space-y-4',
    'mx-auto',

    // Typography
    'text-base',
    'font-medium',
    'font-normal',
    'leading-normal',

    // Forms
    'swal2-input',
    'swal2-select',
    'appearance-none',
    'focus:outline-none',
    'border-none',
  ],
  plugins: [],
};
