import { useState, useEffect, useRef } from "react";
import Codemirror from "codemirror";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { Play, Eraser } from "lucide-react";


function Workspace({ socketRef, roomId }) {
    const editorRef = useRef(null);
    const [output, setOutput] = useState("");

    useEffect(() => {
        async function connect() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById("realtimeEditor"),
                {
                    mode: { name: "clike", json: true },
                    theme: "dracula",
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on("change", (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                if (origin !== "setValue") {
                    socketRef.current.emit("code-change", {
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

        socketRef.current.on("code-change", handleCodeChange);

        return () => {
            if (socketRef.current) {
                socketRef.current.off("code-change", handleCodeChange);
            }
        };
    }, [socketRef, roomId]);

const runCode = async () => {
  const rawCode = editorRef.current.getValue();
  const encodedCode = btoa(rawCode); // base64 encode
  const stdin = btoa("Judge0");

  setOutput(
    <div className="text-sky-400">Running Code...</div>
  );

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      wait: "true",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": "739bd76508msh59d87ad81cefe3dp1c1d57jsnaead8c2097b7",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      language_id: 54,
      source_code: encodedCode,
      stdin,
    },
  };

  try {
    const response = await axios.request(options);
    const { stdout, stderr, compile_output, message, time, memory } = response.data;

    const finalOutput = (
      <div className="text-white p-4 rounded-lg space-y-3 font-mono text-sm leading-relaxed">
        {stdout && (
          <div>
            <span className="text-green-400 font-semibold">✔ Output:</span>
            <pre className="text-white whitespace-pre-wrap mt-1">{atob(stdout)}</pre>
          </div>
        )}

        {stderr && (
          <div>
            <span className="text-red-400 font-semibold">🚫 Error:</span>
            <pre className="text-red-300 whitespace-pre-wrap mt-1">{atob(stderr)}</pre>
          </div>
        )}

        {compile_output && (
          <div>
            <span className="text-yellow-400 font-semibold">🔧 Compilation Error:</span>
            <pre className="text-yellow-200 whitespace-pre-wrap mt-1">{atob(compile_output)}</pre>
          </div>
        )}

        {message && (
          <div>
            <span className="text-blue-400 font-semibold">💬 Message:</span>
            <pre className="text-blue-200 whitespace-pre-wrap mt-1">{atob(message)}</pre>
          </div>
        )}

        <div className="pt-2 border-t border-zinc-700 text-zinc-400">
          <span className="text-green-500">⏱ <strong>Finished in</strong> {time || "N/A"}s</span><br />
          <span>📦 <strong>Memory:</strong> {memory || "N/A"} KB</span>
        </div>
      </div>
    );

    setOutput(finalOutput);
  } catch (error) {
    console.error("Error running code:", error.message);
    setOutput(
      <div className="dark:text-red-200 p-4 text-red-800">
        <p> Error running code: {error.message}</p>
      </div>
    );
  }
};

    return (
        <>
            <div
                className="flex flex-col md:flex-row items-start md:items-center gap-2 p-2 
                bg-violet-100 dark:bg-purple-950
                shadow-md border border-violet-300 
                dark:border-violet-800 transition-colors"
            >
                <button
                    className="flex items-center justify-center py-1 px-5 text-sm font-medium text-white bg-violet-600 
                dark:bg-violet-700 border border-violet-800 
                rounded-full shadow-lg shadow-violet-300 
                dark:shadow-purple-900 hover:bg-violet-700 
                hover:text-white focus:outline-none focus:ring-4 
                focus:ring-violet-200 dark:focus:ring-violet-500 transition"
                    onClick={runCode}
                >
                    <Play className="mr-1" />
                </button>
                <button
                    className="flex items-center justify-center py-1 px-5 text-sm font-medium text-white bg-violet-600 
                dark:bg-violet-700 border border-violet-800 
                rounded-full shadow-lg shadow-violet-300 
                dark:shadow-purple-900 hover:bg-violet-700 
                hover:text-white focus:outline-none focus:ring-4 
                focus:ring-violet-200 dark:focus:ring-violet-500 transition"
                    onClick={() =>
                        editorRef.current.setValue("// realmeet - realtime coding platform")
                    }
                >
                    <Eraser className="mr-1" />
                </button>
                <code className="dark:text-white">{output}</code>
                <div className="flex-1"></div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-white">
                        Room ID:
                    </span>
                    <span className="font-semibold text-sm text-gray-800 dark:text-violet-200">
                        {roomId}
                    </span>
                </div>
            </div>
            <textarea id="realtimeEditor"></textarea>

        </>
    );
}

export default Workspace;
