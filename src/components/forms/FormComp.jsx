import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

function FormComp() {
    const navigate = useNavigate();
    const roomIdRef = useRef(null);
    const usernameRef = useRef();

    const generateRoomId = (e) => {
        e.preventDefault(); // Prevent default form submission
        const roomId = Math.random().toString(36).substring(2, 7);
        toast.success('Room ID generated successfully');
        if (roomIdRef.current) {
            roomIdRef.current.value = roomId;
        }
    };

    const joinRoom = (e) => {
        e.preventDefault(); //Prevent default form submission

        const roomId = roomIdRef.current?.value;
        const username = usernameRef.current?.value;

        if (!roomId || !username) {
            toast.error('Please enter Room ID and Username');
            return;
        }

        navigate(`/editor/${roomId}`, {
            state: {
                username,
            }
        });
    };

    return (
        <>
            <div className='flex flex-col min-h-screen bg-blue-100'>
                <div className="flex items-center justify-center flex-auto">
                    <form className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4">
                        <h2 className="text-2xl font-bold text-center font-mono">Sign In</h2>
                        <div>
                            <label
                                className="font-mono font-medium block text-sm text-blue-700"
                                htmlFor="roomId"
                            >
                                Room ID
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Room ID"
                                id="roomId"
                                className="w-full p-2 mt-1 font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                                ref={roomIdRef} // Attach ref here
                            />
                        </div>
                        <div>
                            <label
                                className="font-mono font-medium block text-sm text-blue-700"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                placeholder="Enter your Username"
                                type="text"
                                id="username"
                                className="font-mono w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                                ref={usernameRef} // Attach ref here
                            />
                        </div>
                        <button
                            onClick={joinRoom}
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 font-mono">
                            Sign In
                        </button>
                        <button
                            type="button"
                            className="w-full text-center cursor-pointer select-none font-mono text-blue-500 hover:text-blue-700"
                            onClick={generateRoomId}>
                            Generate Unique Room ID
                        </button>
                    </form>
                </div>
                <footer className="bg-blue-100 text-center p-4">
                    Built with ❤️ by <a href="https://pflix.vercel.app/" className="font-semibold text-blue-500">Piyush Aryan</a>
                </footer>
            </div>


        </>
    );
}

export default FormComp;
