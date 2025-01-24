import { useState, useRef, useEffect } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useSocket } from '../../../Context/SocketContext';
import { cpp } from '@codemirror/lang-cpp';
import { closeBrackets } from '@codemirror/autocomplete';
import { basicSetup } from '@uiw/react-codemirror';
import { aura } from '@uiw/codemirror-theme-aura';
import { lineNumbers } from '@codemirror/view';
import { EditorView } from '@codemirror/view';

const Workspace = ({roomId}) => {
  const { socketRef } = useSocket();
  const [code, setCode] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    // Accessing the editor instance
    if (editorRef.current) {
      const editorInstance = editorRef.current.view;
      console.log('Editor instance:', editorInstance);
    }
  }, []);

  const handleChange = (value, viewUpdate) => {
    setCode(value);

    // Safely log the update information if available
    if (viewUpdate?.transactions?.length > 0) {
      const transaction = viewUpdate.transactions[0];
      console.log('Change detected:', transaction);
    }

    // Emit code change event via WebSocket
    if (socketRef?.current) {
      socketRef.current.emit('code-change', { roomId, code: value });
    }
  };

  const extensions = [
    cpp(),
    closeBrackets(),
    basicSetup, // No need to invoke as a function
    lineNumbers(),
    EditorView.contentAttributes.of({
      spellcheck: 'false',
      autocorrect: 'off',
      autocapitalize: 'off',
      autocomplete: 'off',
    }),
  ];

  return (
    <div className="w-full h-screen">
      <ReactCodeMirror
        ref={editorRef}
        value={code}
        extensions={extensions}
        theme={aura}
        onChange={handleChange}
      />
    </div>
  );
};

export default Workspace;
