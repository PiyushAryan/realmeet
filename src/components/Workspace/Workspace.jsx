import { useState, useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import axios from 'axios';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { Play } from 'lucide-react';
import { BeatLoader } from 'react-spinners';

function Workspace({ socketRef, roomId }) {
    const editorRef = useRef(null);
    const [output, setOutput] = useState('');

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

    useEffect(() => {
        if (!socketRef.current || !editorRef.current) return;

        const handleCodeChange = ({ code }) => {
            if (code !== null && editorRef.current) {
                const cursor = editorRef.current.getCursor();
                const scrollInfo = editorRef.current.getScrollInfo();

                editorRef.current.setValue(code);

                editorRef.current.setCursor(cursor);
                editorRef.current.scrollTo(scrollInfo.left, scrollInfo.top);
            }
        };

        socketRef.current.on('code-change', handleCodeChange);

        return () => {
            if (socketRef.current) {
                socketRef.current.off('code-change', handleCodeChange);
            }
        };
    }, [socketRef, roomId]);

    const runCode = async () => {
        const rawCode = editorRef.current.getValue();
        const encodedCode = btoa(rawCode); // base64 encode  encodeing the code part using btoa
        const stdin = btoa("Judge0");
    
        setOutput(<BeatLoader color="#b946b9" />);
    
        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
                base64_encoded: 'true',
                wait: 'true',  
                fields: '*'
            },
            headers: {
                'x-rapidapi-key': '739bd76508msh59d87ad81cefe3dp1c1d57jsnaead8c2097b7',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                language_id: 93,      // JS lang code
                source_code: encodedCode,
                stdin
            }
        };
    
        try {
            const response = await axios.request(options);
            const { stdout, stderr, compile_output, message } = response.data;
    
            const finalOutput =
                stdout ? atob(stdout) :   //decoding the output part using atob
                stderr ? atob(stderr) :
                compile_output ? atob(compile_output) :
                message ? atob(message) :
                "No output";
    
            setOutput(finalOutput);
        } catch (error) {
            console.error("Error executing code:", error.message);
            setOutput("Execution failed.");
        }
    };
    

    return (
        <>
        <div>
                <button className="py-2.5 px-5 me-2 my-2 mx-2 text-sm font-medium text-white focus:outline-none bg-violet-500 rounded-full border border-purple-900 hover:bg-purple-100 hover:text-purple-700 focus:z-10 focus:ring-4 focus:ring-purple-100" onClick={runCode}><Play /></button>
                <code>{output}</code>
            </div>
            <textarea id="realtimeEditor"></textarea>
            
        </>

    );

}

export default Workspace;
