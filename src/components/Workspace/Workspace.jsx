import { useState, useEffect, useRef } from "react";
import Codemirror from "codemirror";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import AIHint from "./AIHint";


// eslint-disable-next-line react/prop-types
function Workspace({ socketRef, roomId }) {
    const editorRef = useRef(null);
    const aiHint = AIHint({ editorRef, socketRef, roomId });
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

            // Override font family to use monospace instead of Sora
            const cmWrapper = editorRef.current.getWrapperElement();
            if (cmWrapper) {
                cmWrapper.style.fontFamily = "'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace";
            }

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

    // AI Hint Keymap
    useEffect(() => {
        const cm = editorRef.current;
        if (!cm) return;

        // Keymap
        cm.addKeyMap({
            "Ctrl-Space": aiHint.fetchHint,
            Tab: () => {
                if (aiHint.ghostHint) aiHint.acceptGhostHint();
                else cm.replaceSelection("\t");
            },
            Esc: aiHint.clearGhostHint,
        });
    }, [aiHint]);



const runCode = async () => {
  const rawCode = editorRef.current.getValue();
  const encodedCode = btoa(rawCode); // base64 encode
  const stdin = btoa("Judge0");

  setOutput(
    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-blue-700 dark:text-blue-400 font-medium">Running Code...</span>
      </div>
    </div>
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
      <div className="space-y-4 text-sm">
        {stdout && (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-700 dark:text-green-400 font-medium">Output</span>
            </div>
            <pre className="text-green-900 dark:text-green-100 whitespace-pre-wrap font-mono text-sm leading-relaxed">{atob(stdout)}</pre>
          </div>
        )}

        {stderr && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-red-700 dark:text-red-400 font-medium">Runtime Error</span>
            </div>
            <pre className="text-red-900 dark:text-red-100 whitespace-pre-wrap font-mono text-sm leading-relaxed">{atob(stderr)}</pre>
          </div>
        )}

        {compile_output && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-amber-700 dark:text-amber-400 font-medium">Compilation Error</span>
            </div>
            <pre className="text-amber-900 dark:text-amber-100 whitespace-pre-wrap font-mono text-sm leading-relaxed">{atob(compile_output)}</pre>
          </div>
        )}

        {message && (
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-blue-700 dark:text-blue-400 font-medium">System Message</span>
            </div>
            <pre className="text-blue-900 dark:text-blue-100 whitespace-pre-wrap font-mono text-sm leading-relaxed">{atob(message)}</pre>
          </div>
        )}

        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-slate-500"></div>
            <span className="text-slate-700 dark:text-slate-300 font-medium">Execution Summary</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              <span className="text-slate-600 dark:text-slate-400">
                <span className="font-medium text-slate-800 dark:text-slate-200">{time || "N/A"}s</span> execution time
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              <span className="text-slate-600 dark:text-slate-400">
                <span className="font-medium text-slate-800 dark:text-slate-200">{memory || "N/A"} KB</span> memory used
              </span>
            </div>
          </div>
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
        <div className="flex h-full flex-col bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 px-6 py-4">
                <div className="flex items-center gap-3">
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 border border-gray-800 dark:border-gray-200 shadow-sm h-9 px-4"
                        onClick={runCode}
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <polygon points="5,3 19,12 5,21"/>
                        </svg>
                        Run
                    </button>
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm h-9 px-4"
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
                        <span className="text-sm text-gray-600 dark:text-gray-400">Live Session</span>
                    </div>
                    <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Room:</span>
                        <code className="relative rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 font-mono text-sm font-medium text-gray-900 dark:text-white">
                            {roomId}
                        </code>
                        <button
                            className="group relative inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
                            aria-label="Room settings"
                            title="Room settings"
                        >
                            <svg className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                        <div className="relative group">
                            <button onClick={aiHint.fetchHint}
                                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 border border-orange-400 hover:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105 text-sm font-medium"
                                aria-label="AI Assistant"
                                title="AI Assistant - Coming Soon"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
                                </svg>
                                AI
                            </button>
                            {/* Tooltip */}
                            
                        </div>
                    </div>
                </div>
            </div>

            {output && (
                <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/20 p-6">
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm overflow-hidden">
                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-2">Output</span>
                        </div>
                        <div className="p-4">
                            <div className="font-mono text-sm">
                                {output}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 relative">
                <textarea 
                    id="realtimeEditor" 
                    className="h-full w-full resize-none border-0 bg-white dark:bg-gray-900 p-6 text-sm font-mono outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-white"
                    placeholder="// Start coding here..."
                />
            </div>
        </div>
    );
}

export default Workspace;
