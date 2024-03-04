import {useNavigate } from "react-router-dom"
import { Pfp } from "./Pfp"

export function UserList({ users }) {

    const navigate = useNavigate();

    return <div className='flex flex-col gap-5 pt-4'>
        {users.map((user) => {
            return <div key={user._id} className='flex items-center justify-between'>
                <div className='flex gap-2'>
                    <div className='w-8 h-8'>
                        <Pfp name={[user.firstName, user.lastName]} />
                    </div>
                    <div className='text-xl md:text-2xl'>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
                <button onClick={(e) => {
                    navigate(`/send?id=${user._id}&name=${user.firstName} ${user.lastName}`)
                }} className="button-40 text-l p-3 " role="button">Send Money</button>
            </div>
        })}
    </div>
}


