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
    </div>
    )
}

export default Editor