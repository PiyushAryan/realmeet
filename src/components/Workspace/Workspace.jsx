import React from 'react'
import MonacoEditor from '@monaco-editor/react'

const Workspace = () => {
  return (
    <>
        <div className="flex w-full justify-center items-center h-full">
            <div className=" w-full h-[90%] bg-blue-200 shadow-md rounded-lg">
                <MonacoEditor
                    height="100%"
                    width="100%"
                    defaultLanguage="javascript"
                    language="cpp"
                    theme="vs-dark"
                    defaultValue="// Start coding here!"
                />
            </div>
        </div>
    </>
  )
}

export default Workspace