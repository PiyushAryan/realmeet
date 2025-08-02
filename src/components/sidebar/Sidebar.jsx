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
        <div className="flex h-full w-full flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex flex-col space-y-4 p-6 flex-1 min-h-0">
                <div className="space-y-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold tracking-tight">
                            Participants
                        </h2>
                        <div className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-xs font-medium text-muted-foreground">{users.length}</span>
                        </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-border via-border/50 to-transparent"></div>
                </div>
                
                <div className="flex-1 min-h-0 overflow-y-auto">
                    {users.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                                <div className="w-3 h-3 rounded-full bg-muted-foreground/50 animate-pulse"></div>
                            </div>
                            <p className="text-sm text-muted-foreground">Loading participants...</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {users.map((user) => (
                                <User
                                    key={user.socketId}
                                    username={user.username}
                                    isOnline={true}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            <div className="border-t bg-background/80 backdrop-blur-sm p-6 flex-shrink-0">
                <div className="flex justify-center gap-4">
                    <button
                        className="group relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/90 hover:bg-white border border-gray-200/80 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
                        aria-label="Copy room ID"
                        title="Copy room ID"
                    >
                        <svg className="h-4 w-4 text-gray-700 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                        </svg>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </button>
                    
                    <button
                        className="group relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/90 hover:bg-white border border-gray-200/80 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
                        aria-label="Go to dashboard"
                        title="Dashboard"
                    >
                        <svg className="h-4 w-4 text-gray-700 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9,22 9,12 15,12 15,22"/>
                        </svg>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </button>
                    
                    <Link to="/">
                        <button
                            className="group relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-red-50/90 hover:bg-red-100 border border-red-200/80 hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
                            aria-label="Leave room"
                            title="Leave room"
                        >
                            <svg className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                <polyline points="16,17 21,12 16,7"/>
                                <line x1="21" x2="9" y1="12" y2="12"/>
                            </svg>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;