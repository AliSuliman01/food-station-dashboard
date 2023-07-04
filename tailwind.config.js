const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/react-toastify/dist/ReactToastify.min.css",
  ],
  theme: {
    extend: {
      colors:{
        main:{
          DEFAULT:'#FC4F00',
          500:'#FF8247'
        },
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwindcss-animated')
  ],
});

