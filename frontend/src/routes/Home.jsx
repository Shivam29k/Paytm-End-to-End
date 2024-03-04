import React from 'react'

function Home() {
  return (
    <div className="flex items-center justify-center gap-5 h-screen">
        <div className="flex items-center justify-center gap-10 m-10 flex-col ">
        <div className="text-3xl w-64 text-center font-bold">Welcome to Payments app</div>
        <a href="/signup"><button className="button-50 w-64">Sign Up</button></a>
        <a href="/signin"><button className="button-50 w-64">Sign In</button></a>
      </div>
    </div>
  )
}

export default Home