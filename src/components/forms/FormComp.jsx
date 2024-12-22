import React from 'react'
import { toast } from 'react-hot-toast';

function FormComp() {

    const generateRoomId = () => {
        const roomId = Math.random().toString(36).substring(2, 7);
        toast.success('Room Id generated successfully');
        document.getElementById('room-Id').value = roomId;
    }
    return (
        <>
            <div className="flex items-center justify-center h-screen bg-blue-100">
                <form className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4">
                    <h2 className="text-2xl font-bold text-center font-mono">Sign In</h2>
                    <div>
                        <label className=' font-mono font-medium block text-sm text-blue-700' htmlFor='room-Id'>Room ID</label>
                        <input type='text' placeholder='Enter Room ID' id='room-Id' className='w-full p-2 mt-1 font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' required></input>
                    </div>
                    <div>
                        <label className='font-mono font-medium block text-sm text-blue-700' htmlFor='username'>Username</label>
                        <input placeholder='Enter your Username' type='text' id='username' className='font-mono w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' required></input>
                    </div>
                    <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 font-mono'>Sign In</button>
                    <button
                        className=" w-full text-center cursor-pointer select-none font-mono text-blue-500 hover:text-blue-700" onClick={generateRoomId}>
                        Generate Unique Room Id
                    </button>
                </form>
               
            </div>
        </>
    )
}

export default FormComp