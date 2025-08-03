import React from 'react'
import { Link } from 'react-router'
import Navbar from '../components/common/Navbar'


export default function NotFound() {
    return (
<>

<Navbar />
        <div className='flex justify-center items-center'>

            <div>
                <img src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" alt="404" />
                <p className='font-mono text-4xl mb-2 text-center'>Look like {`you're`} lost</p>
                <p className='font-mono text-sm mb-5 text-center'>The page you are looking for is not available</p>
                <div className='flex justify-center'>
                    <button className='bg-blue-500 hover:bg-blue-900 font-mono text-white font-bold rounded-sm py-2 px-4'><Link to="/">Go to Home</Link></button>
                </div>
            </div>
        </div>
    </>
    )
}
