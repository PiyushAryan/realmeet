import Avatar from 'react-avatar'


// eslint-disable-next-line react/prop-types
function User({ username, isOnline}) {
    return (
        <>
        <div className="relative">
        <div className="flex gap-4 flex-col items-center">
                <Avatar name={username} size="50" round={true} />
                <p className="text-sm font-medium text-gray-700">{username}</p>
                <div className={`absolute right-0 top-0 h-3 w-3 rounded-full ${
                isOnline ? "bg-green-500": "bg-red-500"
                }`}></div>
        </div>
        </div>
        </>
    )
}

export default User