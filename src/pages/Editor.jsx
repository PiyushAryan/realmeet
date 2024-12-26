import Workspace from '../components/Workspace/Workspace'
import Sidebar from '../components/sidebar/Sidebar'
import Split from 'react-split'
import { Link } from 'react-router'


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
        <div className='bg-gray-700'>
          <Workspace />
        </div>
      </Split>
    </div>
  )
}

export default Editor