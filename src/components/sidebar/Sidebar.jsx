import { useContext } from 'react';
import { ThemeContext } from '../../../Context/ThemeContext';
import User from '../common/User';
import { Link, useLocation, Navigate } from 'react-router';




// eslint-disable-next-line react/prop-types
function Sidebar({ users = [] }) {
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const location = useLocation();

    if (!location.state) {
        return <Navigate to='/' />;
    }


    return (
        <>
            <div className="bg-purple-200 dark:bg-purple-950 text-gray-900 dark:text-gray-100 p-4 rounded-md shadow-md">
                <p className="text-sm text-violet-950 dark:text-purple-300 font-semibold">Active Users</p>
                <hr className="border-t border-blue-700 dark:border-purple-400 my-2" />

                <div className="flex gap-4 flex-wrap items-center justify-around mt-4">
                    {users.length === 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
                    )}
                    {users.map((user) => (
                        <User
                            key={user.socketId}
                            username={user.username}
                            isOnline={true}
                        />
                    ))}

                    <button
                        aria-label="leave-button"
                        className="px-4 py-2 bg-red-500 dark:bg-red-600 border-2 border-red-700 dark:border-red-400 text-white rounded-md shadow-md fixed bottom-6 left-48 hover:bg-red-600 dark:hover:bg-red-500 transition"
                    >
                        <Link to="/">
                            <img
                                src="/log-out.svg"
                                className="w-6 h-6 filter invert"
                                alt="leave room"
                            />
                        </Link>
                    </button>
                    
                    <button
                        className="px-4 py-2 bg-purple-400 dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-400 rounded-md shadow-md fixed bottom-6 left-28 hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
                        aria-label="login"
                    >
                        <img
                            src="/home.svg"
                            className="w-6 h-6 filter invert"
                            alt="home"
                        />
                    </button>
                    
                    <button
                        className="px-4 py-2 bg-purple-400 dark:bg-gray-700 border-2 border-purple-200 dark:border-purple-400 rounded-md shadow-md fixed bottom-6 left-6 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        aria-label="Copy room id"
                    >
                        <img
                            src="/copy.svg"
                            alt="copy Room Id"
                            className=" filter invert w-6 h-6"
                        />
                    </button>

                
                </div>
            </div>

        </>
    );
}

export default Sidebar;