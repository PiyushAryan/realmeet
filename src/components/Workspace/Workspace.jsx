import ReactCodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { cpp } from '@codemirror/lang-cpp';
import { closeBrackets } from '@codemirror/autocomplete';

const Workspace = () => {
  const [code, setCode] = useState('');

  const handleChange = (value) => {
    setCode(value);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full h-full min-h-[calc(100vh-20px)]">
        <ReactCodeMirror
          value={code}
          extensions={[
            cpp(),
            closeBrackets(),
          ]}
          theme={darcula}
          onChange={handleChange}
          style={{
            height: '100%',
            width: '100%',
            
          }}
        />
      </div>
    </div>
  );
};

export default Workspace;