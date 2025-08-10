import Avatar from 'react-avatar'


// eslint-disable-next-line react/prop-types
function User({ username, isOnline }) {
    return (
        <div className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm">
            <div className="relative">
                <div className="ring-2 ring-gray-200 dark:ring-gray-700 rounded-full transition-all group-hover:ring-gray-300 dark:group-hover:ring-gray-600">
                    <Avatar name={username} size="36" round={true} />
                </div>
                {isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900 shadow-sm animate-pulse"></div>
                )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <span className="font-medium text-gray-900 dark:text-white truncate group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {username}
                </span>
                <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-gray-400 dark:bg-gray-600'}`}></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {isOnline ? "Active" : "Offline"}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default User