import axios from "axios";
import { useState, useRef } from "react";

export default function AIHint({ editorRef, socketRef, roomId }) {
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
    const beforeCursor = code.substring(0, cm.indexFromPos(cursor));
    const afterCursor = code.substring(cm.indexFromPos(cursor));

    try {
      const res = await axios.post("http://localhost:3000/api/ai-hint", {
        prompt: beforeCursor,
        suffix: afterCursor,
      });
    
      const data = res.data; // axios puts the JSON response here
      console.log(data.hint);
    
      if (data.hint && data.hint.trim()) {
        showGhostHint(data.hint);
      }
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
