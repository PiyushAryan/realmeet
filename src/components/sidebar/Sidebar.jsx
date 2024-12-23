import React from 'react'

function Sidebar() {
  return (
    <aside className='w-90 bg-white shadow-md p-4'>
        <p className='text-sm text-gray-600'>Users</p>
        <hr className='border-2 border-solid border-blue-700'/>
        <div className='mt-4'>
            <h2 className='text-lg font-semibold'>React icons</h2>
        </div>

        <div className='mt-4'>
            <h2 className='text-lg font-semibold'>React Avatar</h2>
        </div>

    </aside>
  )
}

export default Sidebar