import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Redirect() {
    const [count, setCount] = useState(10)
    const navigate = useNavigate()
    useEffect(() => {
        setInterval(() => {
            setCount((currentCount) => {
                if (currentCount <= 1) {
                    navigate('/dashboard');
                    return 0;
                } else {
                    return currentCount - 1;
                }
            });
        }, 1000);
    }, []);


    return (
        <div className='h-screen bg-zinc-400 flex items-center justify-center '>
            <div className='shadow-2xl h-3/6 sm:w-4/5 min-w-80 max-w-md min-h-96 rounded-xl bg-white flex items-center justify-center flex-col gap-6 absolute z-0'>
                <div className='font-bold text-2xl sm:text-5xl drop-shadow-3xl  text-center' >Transaction Successful!!</div>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 fill-green-600">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>

                <p>Redirecting to <a href="/dashboard" className='underline text-blue-500'>dashboard</a> in {count} seconds...</p>

            </div>
        </div>
    )
}

export default Redirect