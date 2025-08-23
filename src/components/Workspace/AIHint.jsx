import {useState, useRef} from 'react'
import axios from 'axios'

export default function AIHint({editorRef, socketRef, roomId}) {

    const [ghostHint, setGhostHint] = useState("");
    const ghostMarkerRef = useRef(null);

    const showGhostHint = (hint) => {
        clearGhostHint();
    
        setGhostHint(hint);
        const cm = editorRef.current;
        const cursor = cm.getCursor();
    
        ghostMarkerRef.current = cm.setBookmark(cursor, {
          widget: (() => {
            const span = document.createElement("span");
            span.style.opacity = "0.5";
            span.style.color = "#999";
            span.style.fontFamily = "monospace";
            span.textContent = hint;
            return span;
          })(),
        });
      };
    
      const acceptGhostHint = () => {
        if (!ghostHint) return;
        const cm = editorRef.current;
        cm.replaceSelection(ghostHint);
        clearGhostHint();
    
        // emit change after accepting
        socketRef.current.emit("code-change", { roomId, code: cm.getValue() });
      };
    
      const clearGhostHint = () => {
        if (ghostMarkerRef.current) {
          ghostMarkerRef.current.clear();
          ghostMarkerRef.current = null;
        }
        setGhostHint("");
      };
    
      const fetchHint = async () => {
        if (!editorRef.current) return;
        const cm = editorRef.current;
        const cursor = cm.getCursor();
        const code = cm.getValue();
    
        try {
          const response = await axios.post("/api/ai-hint", { code, cursor });
          showGhostHint(response.data.hint);
        } catch (err) {
          console.error("AI hint error:", err.message);
        }
      };
    
      return {
        ghostHint,
        showGhostHint,
        acceptGhostHint,
        clearGhostHint,
        fetchHint,
      };
    }