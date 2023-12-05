import React, { useContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';


const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authUser, setAuthUser } = useContext( AuthContext );
  const navigate = useNavigate();
  const [ loginAlert, setLoginAlert ] = useState('');
  const [ registerAlert, setRegisterAlert ] = useState('');
  const [ loader, setLoader ] = useState(false);


  const auth = getAuth();

  const createUser = async (e) => {
    e.preventDefault();
    setLoader(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setTimeout(() => {
          setAuthUser(user);
          navigate('/home');
        }, 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoader(false);
        setRegisterAlert("Failed to register");
        console.log(errorCode, errorMessage);
      });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setLoader(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setTimeout(() => {
          setAuthUser(user);
          navigate('/home');
        }, 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoader(false);
        setLoginAlert("Failed to authenticate");
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="relative flex items-center justify-center grow bg-[url('../public/images/login.png')] bg-right bg-contain bg-no-repeat ">

      { loader &&
          <MoonLoader color="#30E0A1" cssOverride={{ position: 'absolute', top: '50%', left: '50%' }} />  
      }

      <div className="flex justify-center gap-10">

        {/* Login form --------------------------- */}
        <form className="login bg-[#E5E5E5] p-5 rounded-md border border-[#FF7799] font-sansSerif text-gray-500 shadow-md">
          <h2 className="text-2xl mb-6">Login</h2>
          <div className="username flex border rounded text-gray-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 mx-2 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <input 
              className="outline-none px-2 h-full py-2 text-lg" 
              type="email" placeholder="user email" 
              autoComplete="email" 
              onChange={ (e) => setEmail(e.target.value)} 
              onFocus={() => setLoginAlert('')}/>
          </div>
          <div className="password flex border rounded text-gray-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 mx-2 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
            <input 
            className="outline-none px-2 h-full py-2 text-lg" 
            type="password" 
            placeholder="password" 
            autoComplete="current-password" 
            onChange={ (e) => setPassword(e.target.value)}
            onFocus={() => setLoginAlert('')} />
          </div>
          <div className={`show_info text-sm mb-4 w-full text-white text-center ${ loginAlert && 'bg-[#FF7799]'} p-1 rounded-md`}>{loginAlert}</div>
          <div className="submit border rounded mb-4 bg-[#FF7799] text-white cursor-pointer transition-all duration-300 hover:scale-95 hover:hover:bg-[#ee537a]">
            <div className="wrapper flex w-max mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>
              <input 
                className="outline-none px-2 h-full cursor-pointer py-2 text-lg bg-transparent" 
                type="button"
                value="Login" 
                onClick={ loginUser } />
            </div>
          </div>
        </form>

        {/* Register form --------------------------- */}
        <form className="register bg-[#E5E5E5] p-5 rounded-md border border-[#30D5C8] shadow-md">
          <h2 className="text-2xl mb-6 font-sansSerif text-gray-500">Register</h2>
          <div className="username flex border rounded text-gray-500 mb-4">
            <input 
            className="outline-none px-4 h-full py-2 text-lg" 
            type="email" 
            placeholder="user email" 
            onChange={(e) => setEmail(e.target.value)} 
            onFocus={() => setRegisterAlert('')} 
            autoComplete="email" />
          </div>
          <div className="password flex border rounded text-gray-500 mb-4">
            <input 
            className="outline-none px-4 h-full py-2 text-lg" 
            type="password" 
            placeholder="password" 
            onChange={ (e) => setPassword(e.target.value) } 
            autoComplete="current-password"
            onFocus={() => setRegisterAlert('')} />
          </div>
          <div className={`show_info text-sm mb-4 w-full text-white text-center ${ registerAlert && 'bg-[#FF7799]'} p-1 rounded-md`}>{registerAlert}</div>
          <div className="submit border rounded mb-4 bg-[#30E0A1] text-white cursor-pointer transition-all duration-300 hover:hover:bg-[#35a880] hover:scale-95">
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