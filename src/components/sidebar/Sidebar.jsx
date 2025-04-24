import { useState } from 'react';
import User from '../common/User';
import { Link, useLocation, Navigate } from 'react-router';


// eslint-disable-next-line react/prop-types
function Sidebar({ users = [] }) {
    const location = useLocation();

    if (!location.state) {
        return <Navigate to='/' />;
    }


    return (
        <>
            <p className="text-sm text-violet-950">Active Users</p>
            <hr className="border-1 border-solid border-blue-700" />
            <div className="flex gap-4 flex-wrap items-center justify-around mt-4">
                {users.map((user) => (
                    <User
                        key={user.socketId}
                        username={user.username}
                        isOnline={true}
                    />
                ))}

                <button
                    aria-label="leave-button"
                    className="px-4 py-2 bg-red-400 border-2 border-red-700 rounded-md shadow-md fixed bottom-6 left-48 hover:bg-red-100 transition">
                    <Link to='/'>
                        <img
                            src="https://img.icons8.com/ios-glyphs/30/export.png"
                            className="w-6 h-6"
                            alt="leave room"
                        />
                    </Link>
                </button>
                <button
                    className="px-4 py-2 bg-white border-2 border-indigo-500 rounded-md shadow-md fixed bottom-6 left-28 hover:bg-indigo-90 transition"
                    aria-label="login">
                    <img
                        src="/icons8-home.gif"
                        className="w-6 h-6"
                        alt="login"
                    />
                </button>
                <button
                    className="px-4 py-2 bg-gray-100 border-2 border-indigo-500 rounded-md shadow-md fixed bottom-6 left-6 hover:bg-indigo-100 transition"
                    aria-label="Copy room id">
                    <img
                        src="https://img.icons8.com/ios-glyphs/30/copy.png"
                        className="w-6 h-6"
                        alt="copy Room Id"
                    />
                </button>
            </div>
        </>
    );
}

export default Sidebar;