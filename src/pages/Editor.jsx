import { useRef } from 'react';
import { useParams } from 'react-router';
import Workspace from '../components/Workspace/Workspace'
import Sidebar from '../components/sidebar/Sidebar'





function Editor() {
  const socketRef = useRef();
  const { roomId } = useParams();


  return (
    <>
        <div className="grid grid-cols-[300px_1fr] min-h-screen">
          <aside className="bg-[rgb(169,147,191)] p-5 text-white flex flex-col h-full border-r-2 border-violet-950">
            <div className="flex-1">
              <Sidebar socketRef={socketRef} roomId={roomId} />
            </div>
          </aside>
          <div>
            <Workspace socketRef={socketRef} roomId={roomId} />
          </div>
        </div>
    </>
  )
}

export default Editor