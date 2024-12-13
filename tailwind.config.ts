import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        signup: "url('/images/bg_Image/Bg_Signup.jpg')",
        login: "url('/images/bg_Image/Bg_Login.png')",
      },
    },
  },
  plugins: [],
};
export default config;
