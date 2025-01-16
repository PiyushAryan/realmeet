import { useState, useRef, useEffect } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { closeBrackets } from '@codemirror/autocomplete';
import { basicSetup } from '@uiw/react-codemirror';
import { aura } from '@uiw/codemirror-theme-aura';
import { lineNumbers } from '@codemirror/view';
import { EditorView } from '@codemirror/view';

const Workspace = () => {
  const [code, setCode] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
  
    if (editorRef.current) {
      // console.log('Editor instance:', editorRef.current.view);
      // editorRef.current('change' , instance  => {
      //   console.log('Editor instance:', instance);
      // })
    }
  }, []);
  
  console.dir(editorRef.current)
  
  const handleChange = (value, viewUpdate) => {
    setCode(value); 
    // console.log('Updated Code:', value); 
    // console.log('View Update:', viewUpdate);
    console.log('Editor instance:', viewUpdate?.transactions[0].annotations[0]?.value)
  };

  return (
    <div className="w-full h-screen">
      <ReactCodeMirror
        ref={editorRef}
        value={code}
        extensions={[
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
          EditorView.updateListener.of((viewUpdate) => {
            console.log('View Update Listener:', viewUpdate);
          }),
        ]}
        theme={aura} 
        onChange={handleChange}
      />
    </div>
  );
};

export default Workspace;
