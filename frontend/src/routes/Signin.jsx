import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Signin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoad] = useState(false);

  const navigate = useNavigate();

  const signIn = async () => {
    setLoad(true);
    // await axios.post('http://localhost:3000/api/v1/user/signin', {
    await axios.post('https://paytm-end-to-end-production.up.railway.app/api/v1/user/signin', {
      username: email,
      password: password
    })
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem("user", JSON.stringify(`Bearer ${response.data.token}`));
          console.log("redirecting...... to dashborad.");
          navigate('/dashboard');
        } else {
          setLoad(false);
          alert(response.data.message);
        }
      })
      .catch((err) => {
        setLoad(false);
        alert("error: " + err.response.data.message);
        console.log(err);
      })
  }

  return (
    <>
      <div className='h-screen bg-zinc-400 flex items-center justify-center '>
        <div className='shadow-2xl h-4/6 min-h-[450px] sm:w-4/5 min-w-80 max-w-md rounded-xl bg-white flex items-center justify-around flex-col absolute z-0'>
          <div className='font-bold text-5xl drop-shadow-3xl mt-4' >Sign In</div>
          <div className='w-5/6'>
            <div className='text-xl text-center text-gray-500 ' >Enter your credentials to access your account</div>
          </div>
          <div className='w-4/5 flex flex-col gap-1.5'>
            <div className='text-xl font-semibold mt-2'>Email</div>
            <input type="text" onChange={e => setEmail(e.target.value)} className='border-2 rounded-md w-full p-2 text-xl' placeholder='leafvillage@example.com' />
            <div className='text-xl font-semibold mt-2'>Password</div>
            <input type="password" onChange={e => setPassword(e.target.value)} className='border-2 rounded-md w-full p-2 text-xl' placeholder='' />
            {/* <button onClick={signUp} className='border-2 rounded-md w-full p-2 text-xl bg-black text-white mt-2'>Sign up</button> */}
            <button onClick={signIn} className="button-50 text-xl mt-4" role="button">Sign in</button>
          </div>
          <div className='font-semibold mt-2 mb-2'>Dont have an account? <a href="/signup" className='text-blue-500 underline'>Sign Up</a></div>
        </div>
        {loading && <Loading />}
      </div>
    </>
  )
}

function Loading() {
  return <div className='bg-gray-200/[.7] shadow-2xl h-4/6 min-h-[450px] sm:w-4/5 min-w-80 max-w-md rounded-xl flex items-center justify-center relative z-2 flex-col gap-10 '>

    <div role="status ">
      <svg aria-hidden="true" className="drop-shadow-3xl h-20 text-white animate-spin dark:text-transparent fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
    </div>
    <div className='text-black text-2xl drop-shadow-3xl'>Signing In...</div>

  </div>
}


export default Signin