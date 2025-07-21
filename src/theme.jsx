import { createContext , useState , useMemo } from "react";
import { createTheme } from "@mui/material/styles";



//color topkens
export const modeToken = (mode)=> ({
    ...(mode==='dark'?
        {
            navy: {
          100: "#ccd9e0",
          200: "#99b2c2",
          300: "#668ca3",
          400: "#336585",
          500: "#003f66",
          600: "#003252",
          700: "#00263d",
          800: "#001929",
          900: "#000d14"
},    
            prussia: {
          100: "#ccd4da",
          200: "#99aab5",
          300: "#667f8f",
          400: "#33556a",
          500: "#002a45",
          600: "#002237",
          700: "#001929",
          800: "#00111c",
          900: "#00080e"
},
oxford: {
    100: "#ccd1d5",
    200: "#99a4ac",
    300: "#677682",
    400: "#344959",
    500: "#011b2f",
    600: "#011626",
    700: "#01101c",
    800: "#000b13",
    900: "#000509"
},

        yellow: {
          100: "#fff1d0",
          200: "#ffe3a1",
          300: "#ffd573",
          400: "#ffc744",
          500: "#ffb915",
          600: "#cc9411",
          700: "#996f0d",
          800: "#664a08",
          900: "#332504"
},
        LigYellow: {
          100: "#fff6de",
          200: "#ffedbc",
          300: "#ffe59b",
          400: "#ffdc79",
          500: "#ffd358",
          600: "#cca946",
          700: "#997f35",
          800: "#665423",
          900: "#332a12"
},
white: {
    100: "#ffffff",
    200: "#ffffff",
    300: "#fefefe",
    400: "#fefefe",
    500: "#fefefe",
    600: "#cbcbcb",
    700: "#989898",
    800: "#666666",
    900: "#333333"
},
black: {
    100: "#d6d6d6",
    200: "#adadad",
    300: "#858585",
    400: "#5c5c5c",
    500: "#333333",
    600: "#292929",
    700: "#1f1f1f",
    800: "#141414",
    900: "#0a0a0a"
},



        }:    {
navy: {
          100: "#ccd9e0",
          200: "#99b2c2",
          300: "#668ca3",
          400: "#336585",
          500: "#003f66",
          600: "#003252",
          700: "#00263d",
          800: "#001929",
          900: "#000d14"
},    
            prussia: {
          100: "#ccd4da",
          200: "#99aab5",
          300: "#667f8f",
          400: "#33556a",
          500: "#002a45",
          600: "#002237",
          700: "#001929",
          800: "#00111c",
          900: "#00080e"
},
oxford: {
    100: "#ccd1d5",
    200: "#99a4ac",
    300: "#677682",
    400: "#344959",
    500: "#011b2f",
    600: "#011626",
    700: "#01101c",
    800: "#000b13",
    900: "#000509"
},

        yellow: {
          100: "#fff1d0",
          200: "#ffe3a1",
          300: "#ffd573",
          400: "#ffc744",
          500: "#ffb915",
          600: "#cc9411",
          700: "#996f0d",
          800: "#664a08",
          900: "#332504"
},
        LigYellow: {
          100: "#fff6de",
          200: "#ffedbc",
          300: "#ffe59b",
          400: "#ffdc79",
          500: "#ffd358",
          600: "#cca946",
          700: "#997f35",
          800: "#665423",
          900: "#332a12"
},
white: {
    100: "#ffffff",
    200: "#ffffff",
    300: "#fefefe",
    400: "#fefefe",
    500: "#fefefe",
    600: "#cbcbcb",
    700: "#989898",
    800: "#666666",
    900: "#333333"
},
black: {
    100: "#d6d6d6",
    200: "#adadad",
    300: "#858585",
    400: "#5c5c5c",
    500: "#333333",
    600: "#292929",
    700: "#1f1f1f",
    800: "#141414",
    900: "#0a0a0a"
},}
    )
})

//mui theme 
export const themeSettings = (mode) => {
    const colors = modeToken(mode);

    return {
       palette: {
  mode: mode,
  ...(mode === 'dark'
    ? {
        // Dark Theme - Deep Charcoal & Gold
        primary: {
          dark: colors.black[800],     // Near-black
          main: colors.black[500],     // Charcoal
          light: colors.black[300],    // Medium gray
        },
        secondary: {
          dark: colors.yellow[700],    // Burnt gold
          main: colors.yellow[500],    // Rich gold
          light: colors.yellow[300],   // Soft gold
        },
        neutral: {
          dark: colors.LigYellow[700], // Dark cream
          main: colors.LigYellow[500], // Warm beige
          light: colors.LigYellow[300],// Off-white
        },
        background: {
          default: colors.black[600],  // Deep charcoal
          paper: colors.black[400],
        },
        text: {
          primary: colors.LigYellow[100], // Cream text
          secondary: colors.yellow[200], // Light gold
        }
      
      }
    : {
        // Light Theme - Warm Ivory & Amber
        primary: {
          dark: colors.yellow[200],    // Dark amber
          main: colors.yellow[400],     // Honey gold
          light: colors.yellow[200],    // Pale gold
        },
        secondary: {
          dark: colors.LigYellow[700], // Dark cream
          main: colors.LigYellow[500], // Warm beige
          light: colors.LigYellow[300],// Ivory
        },
        neutral: {
          dark: colors.black[300],     // Medium gray
          main: colors.black[200],     // Light gray
          light: colors.black[100],    // Pale gray
        },
        background: {
          default: colors.LigYellow[100], // Warm ivory
          paper: colors.white[500],
        },
        text: {
          primary: colors.black[800],   // Deep charcoal
          secondary: colors.yellow[700],// Amber accents
        }
      }
  )
},
        typography:{
            fontFamily:["Roboto"],
            fontSize:12,
            h1:{
               fontFamily:["Roboto"],
               fontSize:40,
            }, h2:{
               fontFamily:["Roboto"],
               fontSize:32,
            }, h3:{
               fontFamily:["Roboto"],
               fontSize:24,
            }, h4:{
               fontFamily:["Roboto"],
               fontSize:20,
            }, h5:{
               fontFamily:["Roboto"],
               fontSize:16,
            }, h6:{
               fontFamily:["Roboto"],
               fontSize:14,
            }
        }
    }
}

export const colorModeContext = createContext({
    toggleColorMode: ()=>{}
})

export const useMode = () => {
    const [mode,setMode] = useState("light");

    const colorMode =useMemo(
        ()=>({
            toggleColorMode:()=>
                setMode(prev => (prev === "light" ? "dark" : "light"))
            
        }),[]
    );

    const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);
    return [theme,colorMode];
}