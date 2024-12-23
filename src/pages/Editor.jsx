import Workspace from '../components/Workspace/Workspace'
import Sidebar from '../components/Sidebar/Sidebar'
import Split from 'react-split'

function Editor() {
    return (
        <div className="flex h-screen">
            <Split
                sizes={[30, 70]} 
                gutterSize={8} // Space between the two panes
                minSize={200}
                className="flex w-full" 
            >
                <div className="bg-gray-800 h-full">
                    <Sidebar />
                </div>
                <div className="bg-gray-100 h-full">
                    <Workspace />
                </div>
            </Split>
        </div>
    )
}

export default Editor