import { useState } from 'react'
import User from '../common/User'


function Sidebar() {

    const [users, setUsers] = useState([

        {socketId: 1, username: 'Piyush Aryan'},
        {socketId: 2, username: 'Ayush Aryan'},
        {socketId: 3, username: 'Samridhi Aryan'},
        {socketId: 4, username: 'Pragya Aryan'},
        {socketId: 5, username: 'Satakshi Aryan'},
        {socketId: 6, username: 'Shristi Aryan'},

    ]);
    return (
        
        <aside className="w-full h-full bg-blue-100 shadow-md p-4">
        <p className="text-sm text-gray-600">Active Users</p>
        <hr className="border-2 border-solid border-blue-400" />
        <div className="flex gap-5 flex-wrap items-center justify-around mt-4">
                    {users.map((user,) => (
                        <User 
                        key= {user.socketId} 
                        username= {user.username} />
                    ))}
            
        </div>
        
    </aside>
    )
}

export default Sidebar