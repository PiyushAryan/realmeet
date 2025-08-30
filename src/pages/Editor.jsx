import { useRef, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate} from 'react-router';
import Sidebar from '../components/sidebar/Sidebar';
import Workspace from '../components/Workspace/Workspace';
import { connectSocket } from '../socket';
import toast from 'react-hot-toast';


function Editor() {
  const socketRef = useRef(null);
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [socketConnected, setSocketConnected] = useState(false);
  const [users, setUsers] = useState([]); // Add this to track users
  
  useEffect(() => {
    const initSocket = async () => {
      try {
        socketRef.current = await connectSocket();
        
        socketRef.current.on('connect_failed', handleErrors);
        socketRef.current.on('connect_error', handleErrors);
        
        // Join the room
        socketRef.current.emit('join', {
          roomId,
          username: location.state?.username || 'Anonymous',
        });
        
        // Listen for user events at the top level
        socketRef.current.on('joined', ({ users, username, socketId }) => {
          console.log("Users in room:", users); // remove in prod
          setUsers(users);
          if (location.state?.username !== username) {
            toast.success(`${username} joined the room`);
          }
        });
        
        socketRef.current.on('left', ({ socketId, username }) => {
          console.log("User left:", username); // remove in prod
          toast.success(`${username} left the room`);
          setUsers(prev => prev.filter(user => user.socketId !== socketId));
        });
        
        setSocketConnected(true);
      } catch (err) {
        console.error('Socket initialization error:', err);
        toast.error('Failed to connect to server');
      }
    };
    
    function handleErrors(e) {
      console.log('socket error', e); // remove in prod 
      toast.error('An error occurred while connecting to the server');
      navigate('/');
    }
    
    initSocket();
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId, location.state, navigate]);

  return (
    <>

    {/* <Navbar /> */}
    <div className="flex h-screen bg-white dark:bg-gray-900 overflow-hidden">
      <aside className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <Sidebar 
          socketRef={socketRef} 
          roomId={roomId} 
          socketConnected={socketConnected} 
          users={users}
        />
      </aside>
      <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-900">
        {socketConnected && <Workspace socketRef={socketRef} roomId={roomId} />}
      </main>
    </div>
    </>
  );
}

export default Editor;