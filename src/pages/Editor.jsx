import Workspace from '../components/Workspace/Workspace'
import Sidebar from '../components/sidebar/Sidebar'
import Split from 'react-split'
import { Link } from 'react-router'


function Editor() {
  return (
    <>
    <div className="grid grid-cols-[300px_1fr] min-h-screen">
  <aside className="bg-[rgb(169,147,191)] p-5 text-white flex flex-col h-full border-r-2 border-violet-950">
    <div className="flex-1">
      <Sidebar />
    </div>
  </aside>
  <div className="flex-1">
    <Workspace />
  </div>
</div>
</>
  )
}

export default Editor