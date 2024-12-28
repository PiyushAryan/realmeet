import { useState } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { basicSetup } from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { closeBrackets } from '@codemirror/autocomplete';
import { aura } from '@uiw/codemirror-theme-aura';
import { EditorView } from '@uiw/react-codemirror';


const Workspace = () => {
  const [code, setCode] = useState('');

  const handleChange = (value) => {
    setCode(value);
  };

  return (
    <>
      <div className="w-full h-screen">
        <ReactCodeMirror
          value={code}
          extensions={[
            cpp(),
            closeBrackets(),
            basicSetup(),
            EditorView.contentAttributes.of({
              spellcheck: 'false',
              autocorrect: 'off',
              autocapitalize: 'off',
            }),
          ]}
          theme={aura}
          onChange={handleChange}
        />
      </div>
    </>

  );
};

export default Workspace;