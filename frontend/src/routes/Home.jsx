import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center gap-5 h-screen">
        <div className="flex items-center justify-center gap-10 m-10 flex-col ">
        <div className="text-3xl w-64 text-center font-bold">Welcome to Payments app</div>
        <button onClick={()=> navigate('/signup')} className="button-50 w-64">Sign Up</button>
        <button onClick={()=> navigate('/signin')} className="button-50 w-64">Sign In</button>
      </div>
    </div>
  )
}

export default Home