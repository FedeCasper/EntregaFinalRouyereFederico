import React, { useContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authUser, setAuthUser } = useContext( AuthContext );
  const navigate = useNavigate();

  const auth = getAuth();

  const createUser = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setAuthUser(user);
        console.log(authUser);
        navigate('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const loginUser = async (e) => {
    console.log(email);
    console.log(password);
    console.log(auth);
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario autenticado:", user.uid);
        setAuthUser(user);
        navigate('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error al autenticar:", error.message);
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className=' flex items-center justify-center grow '>

      <div className="flex justify-center gap-10">

        {/* Login form --------------------------- */}
        <form className="login bg-[#E5E5E5] p-5 rounded-md ">
          <h2 className="text-2xl mb-6">Login</h2>
          <div className="username flex border rounded text-gray-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 mx-2 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <input className="outline-none px-2 h-full py-2 text-lg" type="email" placeholder="user email" autoComplete="email" onChange={ (e) => setEmail(e.target.value)}/>
          </div>
          <div className="password flex border rounded text-gray-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 mx-2 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
            <input className="outline-none px-2 h-full py-2 text-lg" type="password" placeholder="password" autoComplete="current-password" onChange={ (e) => setPassword(e.target.value)} />
          </div>
          <div className="show_info text-sm mb-4 w-max text-red-400">Lorem ipsum consectetur elit.</div>
          <div className="submit border rounded mb-4 bg-[#FF7799] text-white cursor-pointer">
            <div className="wrapper flex w-max mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>
              <input className="outline-none px-2 h-full cursor-pointer py-2 text-lg bg-transparent" type="button" value="Login" onClick={ loginUser } />
            </div>
          </div>
        </form>

        {/* Register form --------------------------- */}
        <form className="register bg-[#E5E5E5] p-5 rounded-md">
          <h2 className="text-2xl mb-6">Register</h2>
          <div className="username flex border rounded text-gray-500 mb-4">
            <input className="outline-none px-4 h-full py-2 text-lg" type="email" placeholder="user email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className="password flex border rounded text-gray-500 mb-4">
            <input className="outline-none px-4 h-full py-2 text-lg" type="password" placeholder="password" onChange={ (e) => setPassword(e.target.value) } autoComplete="current-password"/>
          </div>
          <div className="show_info text-sm mb-4 w-max text-red-400">username already taken</div>
          <div className="submit border rounded mb-4 bg-[#30E0A1] text-white cursor-pointer">
            <div className="wrapper flex w-max mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              <input className="outline-none px-2 h-full cursor-pointer py-2 text-lg bg-transparent" type="button" value="Register" onClick={ createUser } />
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Auth