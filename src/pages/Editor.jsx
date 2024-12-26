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
      <button
        aria-label="leave-button"
        className="px-4 py-2 bg-red-400 border-2 border-red-700 rounded-md shadow-md fixed bottom-6 left-48 hover:bg-red-100 transition">
        <Link to='/'><img src="https://img.icons8.com/ios-glyphs/30/export.png" className="w-6 h-6" alt="leave room" /></Link>
      </button>
      <button
        className="px-4 py-2 bg-white border-2 border-indigo-500 rounded-md shadow-md fixed bottom-6 left-6 hover:bg-indigo-100 transition"
        aria-label="Copy room id">
        <img src="https://img.icons8.com/ios-glyphs/30/copy.png" className="w-6 h-6" alt="copy Room Id" />
      </button>
    </div>
  )
}

export default Editor