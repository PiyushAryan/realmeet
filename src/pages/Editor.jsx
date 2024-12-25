import Workspace from '../components/Workspace/Workspace'
import Sidebar from '../components/sidebar/Sidebar'
import Split from 'react-split'

function Editor() {
    return (
        <div className="flex h-screen">
        <Split
            sizes={[30, 70]} 
            gutterSize={8}
            minSize={200}
            className="flex w-full">
            <div>
                <Sidebar />
            </div>
            <div>
                <Workspace />
            </div>
        </Split>
        <button className="text-gray-200 px-4 py-2 bg-red-500 rounded-md shadow-md fixed bottom-6 left-48 hover:bg-red-100 hover:text-black transition">Leave</button>
        <button className="text-blue-600 px-4 py-2 bg-white rounded-md shadow-md fixed bottom-6 left-6 hover:bg-blue-100 transition">Copy Room Id</button>
    </div>
    )
}

export default Editor