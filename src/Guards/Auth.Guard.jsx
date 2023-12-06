import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const AuthGuard = () => {

   const { authUser } = useContext(AuthContext)

   console.log(authUser);

   return authUser.email ? <Outlet /> : <Navigate to="/" />
}

export default AuthGuard