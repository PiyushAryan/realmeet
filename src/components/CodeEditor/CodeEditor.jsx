import React from 'react'
import MonacoEditor from '@monaco-editor/react'

const CodeEditor = () => {
  return (
    <>
        <div className='flex justify-center items-center h-screen'>
            <div className='text-4xl font-bold'>Code Editor</div>
            <div className="p-4 bg-white shadow-md rounded-lg">
                <MonacoEditor
                    height="90vh"
                    defaultLanguage="javascript"
                    width='100vh'
                    language="cpp"
                    theme="vs-dark"
                    defaultValue="// Start coding here!"
                />
            </div>
        </div>
    </>
  )
}

export default CodeEditor