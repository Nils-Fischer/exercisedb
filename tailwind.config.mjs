/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(16rem, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(16rem, 1fr))",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        emerald: {
          ...require("daisyui/src/theming/themes")["emerald"],
          "--rounded-box": "0.7rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.1rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "0.6rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.01s", // duration of animation when you click on button
          "--animation-input": "0.1s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.98", // scale transform of button when you focus on it
          "--border-btn": "2px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.1rem", // border radius of tabs
        },
      },
      "light",
      "dark",
      "corporate",
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
