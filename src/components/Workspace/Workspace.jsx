import { useState, useRef, useEffect } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { closeBrackets } from '@codemirror/autocomplete';
import { basicSetup } from '@uiw/react-codemirror';
import { aura } from '@uiw/codemirror-theme-aura';
import { lineNumbers } from '@codemirror/view';
import { EditorView } from '@codemirror/view';

const Workspace = ({socketRef, roomId}) => {
  const [code, setCode] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.view;
      console.dir(editorInstance);
    }
  }, [editorRef]);

  const handleChange = (value, viewUpdate) => {
    setCode(value);
    console.log('changes', viewUpdate?.transactions[0]?.annotations[0]?.value);

    // Emit code change event via WebSocket
    // if (socketRef?.current) {
    //   socketRef.current.emit('code-change', { roomId, code: value });
    // }
  };


  const extensions = [
    cpp(),
    closeBrackets(),
    basicSetup(),
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
