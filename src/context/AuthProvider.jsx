import { AuthContext } from "./AuthContext.jsx"
import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"

const AuthProvider = ({ children }) => {

   const [ authUser, setAuthUser ] = useState({})

   const auth = getAuth();
   const isLoggedIn = () => {
      if (auth.currentUser) {
         return true
      } else {
         return false
      }
   }

   useEffect(() => {
      setAuthUser(auth)
   }, [])

   return (
      <AuthContext.Provider value={ { authUser, setAuthUser, isLoggedIn } }>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider
