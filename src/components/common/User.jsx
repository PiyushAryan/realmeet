import Avatar from 'react-avatar'


// eslint-disable-next-line react/prop-types
function User({ username, isOnline }) {
    return (
        <>
            <div className="relative">
                <div className="flex gap-4 flex-col items-center">
                    <div className="border-2 border-purple-600 dark:border-purple-300 rounded-full relative">
                        <Avatar name={username} size="50" round={true} />
                        <div
                            className={`absolute right-0 top-0 h-3 w-3 border rounded-full ${isOnline
                                    ? "bg-green-600 border-purple-100 dark:border-purple-500"
                                    : "bg-red-600 border-purple-100 dark:border-purple-500"
                                }`}
                        ></div>
                    </div>
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-200">
                        {username}
                    </p>
                </div>
            </div>


        </>
    )
}

export default User