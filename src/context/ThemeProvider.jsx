import { ThemeContext } from "./ThemeContext"
import { useState } from "react"

const ThemeProvider = ({ children }) => {

   const [ theme, setTheme ] = useState( 'bg-slate-100' )

   return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
         {children}
      </ThemeContext.Provider>
   )
}

export default ThemeProvider