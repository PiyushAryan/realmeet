import Workspace from '../components/Workspace/Workspace'
import Sidebar from '../components/sidebar/Sidebar'
import Split from 'react-split'
import { Link } from 'react-router'


function Editor() {
  return (
    <>
      <div className='grid grid-cols-[230px_1fr]'>
      <aside className='bg-[#1c1e29] p-4 text-white flex flex-col'>
      <div className='flex-1'>
        <Sidebar />
      </div>
      </aside>
      </div>
    </>


  )
}

export default Editor