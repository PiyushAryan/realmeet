import ReactCodeMirror from '@uiw/react-codemirror';
import 'codemirror/theme/aura.css';
import 'codemirror/mode/clike/clike';
import { useEffect } from 'react';

const Workspace = () => {
 useEffect(() => {
    async function initCodeMirror() {
      ReactCodeMirror.fromTextArea(document.getElementById('code'), {
        mode: {name: 'clike'},
        theme: 'aura',
        autoCloseBrackets: true,
        autoCloseTags: true,
      });
    }
    initCodeMirror();
  }, []);
 
  return (
    <>
          <div className="flex w-full justify-center items-center h-full">
        <div className="w-full h-[90%] bg-blue-200 shadow-md rounded-lg">
         <textarea id="code" name="code" className="w-full h-full"></textarea>
        </div>
      </div>
    </>
  )
}

export default Workspace