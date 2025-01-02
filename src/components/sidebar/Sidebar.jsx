import { useState, useRef, useEffect } from 'react'
import User from '../common/User'
import { Link, useLocation, Navigate, useNavigate, useParams } from 'react-router';
import { connectSocket } from '../../socket';
import toast from 'react-hot-toast';



function Sidebar() {
    const [users, setUsers] = useState([]);
    const socketRef = useRef();
    const location = useLocation();
    const reactNavigation = useNavigate();
    const { roomId } = useParams();

    useEffect(() => {
        const connect = async () => {
            socketRef.current = await connectSocket();
            socketRef.current.on('connect_failed', (err) => handleErrors(err));
            socketRef.current.on('connect_error', (err) => handleErrors(err));


            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('An error occurred while connecting to the server');
                reactNavigation('/');

            }

            socketRef.current.emit('join', {
                roomId,
                username: location.state?.username,
            });
            socketRef.current.on('joined', ({ users, username, socketId }) => {

                if (socketRef.current.id !== socketId) {
                toast.success(`${username} joined the room`);
                console.log(`${username} joined the room`);  //remove the prod
                }

                setUsers(users);

            });
        };

        connect();

    }, []);

    if (!location.state) {
        return (
        <Navigate to='/' />
        );
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
                        isOnline={user.isOnline}
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
                    className="px-4 py-2 bg-white border-2 border-indigo-500 rounded-md shadow-md fixed bottom-6 left-28 hover:bg-indigo-100 transition"
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

    )
}

export default Sidebar