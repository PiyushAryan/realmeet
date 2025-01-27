import { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';



const Workspace = ({socketRef, roomId}) => {
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
                // console.log('Code emitted:', code, 'Origin:', origin);
                if (origin !== 'setValue') {
                    socketRef.current.emit('code-change', {
                        roomId,
                        code,
                    });
                }
                // console.log(code);
            });     
        }
        connect();
    }, []);

    useEffect(() => {
        console.log('changing ref');

        if (socketRef.current) {
            socketRef.current.on('code-change', ({ code }) => {
                console.log('receiving', code);
                if(code !== null){
                    editorRef.current.setValue(code);
                }
            });
        }  
    }, [socketRef.current, editorRef.current]);

    return <textarea id="realtimeEditor"></textarea>;
};

export default Workspace;