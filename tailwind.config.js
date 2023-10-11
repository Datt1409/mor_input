/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      primaryBlue: "#5570f1",
      blur: "#cfd3d4",
      error: "#f57e77",
      disabled: "#f2f4f5",
      success: "#32936f",
      dark: "#5e6366",
    },
  },
};
export const plugins = [];
