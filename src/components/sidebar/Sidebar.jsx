import { useState } from 'react'
import User from '../common/User'


function Sidebar() {

    const [users, setUsers] = useState([
        {socketId: 1, username: 'John Doe'},
        {socketId: 2, username: 'Jane Doe'},
    ]);
    return (
        
        <aside className="w-full h-full bg-blue-100 shadow-md p-4">
        <p className="text-sm text-gray-600">Active Users</p>
        <hr className="border-2 border-solid border-blue-400" />
        <div className="flex items-center space-x-2 mt-4">
            <div className="text-sm text-gray-600">
                {
                    users.map((user,) => (
                        <User 
                        key= {user.socketId} 
                        username= {user.username} />
                    ))
                }
            </div>
            
        </div>
        
    </aside>
    )
}

export default Sidebar