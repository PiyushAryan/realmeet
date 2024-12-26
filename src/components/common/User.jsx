import Avatar from 'react-avatar'


// eslint-disable-next-line react/prop-types
function User({ username}) {
    // console.log(username)
    return (
        <div className='text-center'>
        <div className="flex gap-4 flex-col items-center">
                <Avatar name={username} size="50" round={true} />
                <p className="text-sm font-medium text-gray-700">{username}</p>
        </div>
        </div>
    )
}

export default User