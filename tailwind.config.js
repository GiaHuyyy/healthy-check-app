/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#171A1F",
        secondary: "#535CE8",
      },
      fontFamily: {
        othin100: ["Outfit-Thin", "sans-serif"],
        oextralight200: ["Outfit-ExtraLight", "sans-serif"],
        olight300: ["Outfit-Light", "sans-serif"],
        oregular400: ["Outfit-Regular", "sans-serif"],
        omedium500: ["Outfit-Medium", "sans-serif"],
        osemibold600: ["Outfit-SemiBold", "sans-serif"],
        obold700: ["Outfit-Bold", "sans-serif"],
        oextrabold800: ["Outfit-ExtraBold", "sans-serif"],
        oblack900: ["Outfit-Black", "sans-serif"],

        lthin100: ["Lato-Thin", "sans-serif"],
        llight300: ["Lato-Light", "sans-serif"],
        lregular400: ["Lato-Regular", "sans-serif"],
        lbold700: ["Lato-Bold", "sans-serif"],
        lblack900: ["Lato-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
