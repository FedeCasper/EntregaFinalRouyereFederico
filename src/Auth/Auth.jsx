import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { useUser } from 'reactfire';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(email, password);

  const auth = getAuth();
  console.log("auth:", auth);

  // const user = useUser();
  // console.log("user:", user);


  const submit = async (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

  };

  return (
    <div>
      <h1 className='text-3xl'>Auth</h1>
      <form action="" className='flex flex-col w-2/5'>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" className='bg-slate-100' onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" className='bg-slate-100' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  )
}

export default Auth