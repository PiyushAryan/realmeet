import { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

function Workspace({ socketRef, roomId }) {
    const editorRef = useRef(null);

    useEffect(() => {
        async function connect() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                if (origin !== 'setValue') {
                    socketRef.current.emit('code-change', {
                        roomId,
                        code,
                    });
                }
            });     
        }
        connect();
    }, [roomId]);

//----------------------
// ...existing code...
useEffect(() => {
    // Only set up the listener when both editor and socket are initialized
    if (!socketRef.current || !editorRef.current) return;
    
    const handleCodeChange = ({ code }) => {
      if (code !== null && editorRef.current) {
        // Save cursor position
        const cursor = editorRef.current.getCursor();
        const scrollInfo = editorRef.current.getScrollInfo();
        
        // Update code if different
        editorRef.current.setValue(code);
        
        // Restore cursor and scroll position
        editorRef.current.setCursor(cursor);
        editorRef.current.scrollTo(scrollInfo.left, scrollInfo.top);
      }
    };
    
    // Set up the listener
    socketRef.current.on('code-change', handleCodeChange);
    
    // Clean up
    return () => {
      if (socketRef.current) {
        socketRef.current.off('code-change', handleCodeChange);
      }
    };
  }, [socketRef, roomId]); // Include roomId as a dependency
  // ...existing code...// Add socketRef.current as a dependency
//------------------------

    return <textarea id="realtimeEditor"></textarea>;
}

export default Workspace;
