import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { ThemeContext } from '../../../Context/ThemeContext';

function FormComp() {
    const navigate = useNavigate();
    const roomIdRef = useRef(null);
    const usernameRef = useRef();
    const { theme } = useContext(ThemeContext);

    const generateRoomId = (e) => {
        e.preventDefault();
        const roomId = Math.random().toString(36).substring(2, 10).toUpperCase();
        toast.success('Room ID generated successfully!', {
            style: {
                borderRadius: '10px',
                background: theme === 'dark' ? '#1f2937' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
            },
        });
        if (roomIdRef.current) {
            roomIdRef.current.value = roomId;
        }
    };

    const joinRoom = (e) => {
        e.preventDefault();

        const roomId = roomIdRef.current?.value;
        const username = usernameRef.current?.value;

        if (!roomId || !username) {
            toast.error('Please enter both Room ID and Username', {
                style: {
                    borderRadius: '10px',
                    background: theme === 'dark' ? '#1f2937' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#000',
                },
            });
            return;
        }

        navigate(`/editor/${roomId}`, {
            state: {
                username,
            }
        });
    };

    return (
        <div className="flex-grow bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
            
            {/* Main Container */}
            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="bg-white dark:bg-gray-800  shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-md bg-white/95 dark:bg-gray-800/95">
                    {/* Header */}
                    <div className="px-8 pt-8 pb-6 text-center border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m13 0H10m8-8H4a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
                            Welcome to realmeet
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Join or create a coding session
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={joinRoom} className="p-8 space-y-6">
                        {/* Room ID Input */}
                        <div className="space-y-2">
                            <label
                                htmlFor="roomId"
                                className="block text-sm font-medium text-black dark:text-gray-300"
                            >
                                Room ID
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="roomId"
                                    ref={roomIdRef}
                                    placeholder="Enter room ID"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent outline-none transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Username Input */}
                        <div className="space-y-2">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-black dark:text-gray-300"
                            >
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="username"
                                    ref={usernameRef}
                                    placeholder="Enter your username"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent outline-none transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                type="submit"
                                className="w-full bg-black dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            >
                                Join Session
                            </button>
                            
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white dark:bg-gray-800 px-3 text-gray-500 dark:text-gray-400">
                                        or
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={generateRoomId}
                                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-black dark:text-gray-300 font-medium py-3 px-4 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span>Generate Room ID</span>
                                </div>
                            </button>
             
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                        <div className="text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Built with ❤️ by{' '}
                                <a 
                                    href="https://pflix.vercel.app/" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                                >
                                    Piyush Aryan
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gray-400 dark:bg-gray-500 rounded-full opacity-30 animate-pulse delay-1000"></div>
            </div>
        </div>
    );
}

export default FormComp;
