import CodeEditor from '../components/CodeEditor/CodeEditor'

function Editor() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='text-4xl font-bold px-4'>Editor</div>
            <CodeEditor />
        </div>
    )
}

export default Editor