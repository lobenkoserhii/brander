import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  flags: {
    DEV_SSR: false,
  },
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'border-gradient': 'linear-gradient(180deg, #07547F 0%, #0AE4F2 100%)',},

          screens: {
            'TB': '640px',
            'NPC': '1024px',
            'PC': '1440px',
          },
          colors: {
            'BG': '#1A1C39',
            'Bl': '#000000'
    
              },
          
              fontFamily: {
                Ral: ['Raleway', 'sans-serif'], 
               
              },
              
      },
    },
  
  plugins: [],
  
}


export default config;
