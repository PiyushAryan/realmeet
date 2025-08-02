import { useState, useEffect, useRef } from "react";
import Codemirror from "codemirror";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";


// eslint-disable-next-line react/prop-types
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
    }, [roomId, socketRef]);

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
        <div className="flex h-full flex-col bg-background">
            <div className="flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4">
                <div className="flex items-center gap-3">
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-800 border border-gray-800 shadow-sm h-9 px-4"
                        onClick={runCode}
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <polygon points="5,3 19,12 5,21"/>
                        </svg>
                        Run
                    </button>
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-gray-50 border border-gray-200 shadow-sm h-9 px-4"
                        onClick={() =>
                            editorRef.current.setValue("// realmeet - realtime coding platform")
                        }
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M3 6h18"/>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                            <line x1="10" x2="10" y1="11" y2="17"/>
                            <line x1="14" x2="14" y1="11" y2="17"/>
                        </svg>
                        Clear
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-sm text-muted-foreground">Live Session</span>
                    </div>
                    <div className="h-4 w-px bg-border"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Room:</span>
                        <code className="relative rounded-md bg-muted px-2 py-1 font-mono text-sm font-medium text-foreground">
                            {roomId}
                        </code>
                        <button
                            className="group relative inline-flex items-center justify-center w-8 h-8 rounded-lg bg-muted/50 hover:bg-muted border border-border/50 hover:border-border transition-all duration-200 shadow-sm hover:shadow-md"
                            aria-label="Room settings"
                            title="Room settings"
                        >
                            <svg className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {output && (
                <div className="border-b bg-muted/20 p-6">
                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                        <div className="flex items-center gap-2 bg-muted/50 px-4 py-3 border-b">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-sm font-medium text-muted-foreground ml-2">Output</span>
                        </div>
                        <div className="p-4">
                            <div className="max-h-48 overflow-y-auto font-mono text-sm">
                                {output}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 relative">
                <textarea 
                    id="realtimeEditor" 
                    className="h-full w-full resize-none border-0 bg-background p-6 text-sm font-mono outline-none placeholder:text-muted-foreground"
                    placeholder="// Start coding here..."
                />
            </div>
        </div>
    );
}

export default Workspace;
