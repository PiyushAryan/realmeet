import axios from "axios";
import { useState, useRef } from "react";

export default function useAIHint(editorRef, socketRef, roomId) {
  const [ghostHint, setGhostHint] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [aiHints, setAiHints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const ghostMarkerRef = useRef(null);

  const showGhostHint = (hint) => {
    clearGhostHint();
    setGhostHint(hint);

    const cm = editorRef.current;
    if (!cm) return;

    const cursor = cm.getCursor();

    ghostMarkerRef.current = cm.setBookmark(cursor, {
      widget: (() => {
        const span = document.createElement("span");
        span.style.opacity = "0.5";
        span.style.color = "#999";
        span.style.fontFamily = "monospace";
        span.style.pointerEvents = "none";
        span.textContent = hint;
        return span;
      })(),
    });
  };

  const acceptGhostHint = () => {
    if (!ghostHint) return;
    const cm = editorRef.current;
    if (!cm) return;

    cm.replaceSelection(ghostHint);
    clearGhostHint();

    socketRef.current.emit("code-change", {
      roomId,
      code: cm.getValue(),
    });
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

      const { hint } = res.data; // ✅ safer destructuring
      console.log("AI Hint:", hint);

      if (hint && hint.trim()) {
        showGhostHint(hint);
      }
    } catch (err) {
      console.error("AI hint error:", err.message);
    }
  };

  const fetchAIHints = async () => {
    if (!editorRef.current) return;
    
    setIsLoading(true);
    setShowDropdown(true);
    
    const cm = editorRef.current;
    const code = cm.getValue();
    const cursor = cm.getCursor();
    const beforeCursor = code.substring(0, cm.indexFromPos(cursor));
    const afterCursor = code.substring(cm.indexFromPos(cursor));

    try {
      const res = await axios.post("http://localhost:3000/api/ai-hints", {
        code: code,
        cursor: cm.indexFromPos(cursor),
        beforeCursor: beforeCursor,
        afterCursor: afterCursor,
      });

      const { hints } = res.data;
      console.log("AI Hints:", hints);

      if (hints && Array.isArray(hints)) {
        setAiHints(hints);
      } else {
        setAiHints([]);
      }
    } catch (err) {
      console.error("AI hints error:", err.message);
      setAiHints([]);
    } finally {
      setIsLoading(false);
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
    setAiHints([]);
  };

  const applyHint = (hint) => {
    if (!editorRef.current) return;
    const cm = editorRef.current;
    
    cm.replaceSelection(hint);
    closeDropdown();

    socketRef.current.emit("code-change", {
      roomId,
      code: cm.getValue(),
    });
  };

  return {
    ghostHint,
    showGhostHint,
    acceptGhostHint,
    clearGhostHint,
    fetchHint,
    showDropdown,
    aiHints,
    isLoading,
    fetchAIHints,
    closeDropdown,
    applyHint,
  };
}
