import CodeEditor from '../components/CodeEditor/CodeEditor'

function Editor() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='text-4xl font-bold'>Editor</div>
            <CodeEditor />
        </div>
    )
}

export default Editor