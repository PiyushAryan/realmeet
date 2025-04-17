import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Sidebar from '../components/sidebar/Sidebar';
import Workspace from '../components/workspace/Workspace';
import { connectSocket } from '../socket';
import { useLocation, useNavigate } from 'react-router';
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
          console.log("Users in room:", users);
          setUsers(users);
          if (location.state?.username !== username) {
            toast.success(`${username} joined the room`);
          }
        });
        
        socketRef.current.on('left', ({ socketId, username }) => {
          console.log("User left:", username);
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
      console.log('socket error', e);
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
      <div className="grid grid-cols-[300px_1fr] min-h-screen">
        <aside className="bg-[rgb(169,147,191)] p-5 text-white flex flex-col h-full border-r-2 border-violet-950">
          <div className="flex-1">
            <Sidebar 
              socketRef={socketRef} 
              roomId={roomId} 
              socketConnected={socketConnected} 
              users={users} // Pass users data from parent
            />
          </div>
        </aside>
        <div>
          {socketConnected && <Workspace socketRef={socketRef} roomId={roomId} />}
        </div>
      </div>
    </>
  );
}

export default Editor;