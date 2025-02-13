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
    }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('code-change', ({ code }) => {
                if (code !== null) {
                    const cursor = editorRef.current.getCursor();
                    const currentCode = editorRef.current.getValue();
                    if (currentCode !== code) {
                        editorRef.current.setValue(code);
                        editorRef.current.setCursor(cursor);
                    }
                }
            });
        }  
    }, [socketRef.current]);

    return <textarea id="realtimeEditor"></textarea>;
}

export default Workspace;
