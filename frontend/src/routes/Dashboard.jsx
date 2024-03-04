import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Pfp } from './components/Pfp';
import { UserList } from './components/UserList';
import { Loading } from './components/Loading';

function Dashboard() {

  const userToken = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='flex flex-col h-screen'>
      <Navbar token={userToken} />
      <Balance token={userToken} />
      <Users />
    </div>

  )
}

function Navbar({ token }) {

  const [name, setName] = useState([]);

  useEffect(() => {
    axios.get('https://paytm-end-to-end-production.up.railway.app/api/v1/user/user', {
      headers: {
        Authorization: token
      }
    }).then((response) => {
      setName([response.data.firstname, response.data.lastname]);
    })

  }, []);

  return (
    <div className='flex justify-between p-4 items-center shadow-b rounded'>
      <div className='font-bold text-xl sm:text-3xl md:text-5xl drop-shadow-2xl'>Payments App</div>
      <div className='flex items-center gap-4'>
        <div className='font-bold text-xl sm:text-2xl'>Hello, {name.length>0? `${name[0]} ${name[1]}` : "Loading..."}</div>
        <div className='h-10 w-10'>
          {name[0] && <Pfp  name={name}/>}
        </div>
      </div>
    </div>
  )
}

function Balance({ token }) {
  const [balance, setBalance] = useState('Loading...');

  useEffect(() => {
    axios.get('https://paytm-end-to-end-production.up.railway.app/api/v1/account/balance', {
      headers: {
        Authorization: token
      }
    }).then((resonse) => {
      setBalance(resonse.data.balance);
    })

  }, []);

  return <div className='font-bold text-xl md:text-2xl p-4 pt-8 pb-8'>
    Your Balance:  ₹ {balance}
  </div>
}

function Users() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const searchRef = useRef(null);

  useEffect(() => {

    if (searchRef.current) {
      clearTimeout(searchRef.current)
    }
    searchRef.current = setTimeout(() => {
      axios.get(`https://paytm-end-to-end-production.up.railway.app/api/v1/user/bulk?filter=${search}`)
        .then((response) => {
          setUsers(response.data.user);
        })
    }, 1000);
  }, [search]);

  return <div className='p-4 pt-0'>
    <div className='font-bold pb-4 text-xl md:text-2xl'>Users</div>
    <input type="text" onChange={e => setSearch(e.target.value)} className='border-2 rounded-md w-full p-2 text-xl' placeholder='Search users...' />
    {users.length > 0 ? <UserList users={users} /> : <Loading text={"Loading"}/>}
  </div>
}





export default Dashboard