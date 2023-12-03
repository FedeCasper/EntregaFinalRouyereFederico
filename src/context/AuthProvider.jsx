import { AuthContext } from "./AuthContext.jsx"
import { useState } from "react"

const AuthProvider = ({ children }) => {

   const [ authUser, setAuthUser ] = useState({})

   return (
      <AuthContext.Provider value={ { authUser, setAuthUser } }>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider
