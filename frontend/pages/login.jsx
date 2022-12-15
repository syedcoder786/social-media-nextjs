import React from 'react'

const login = () => {
  return (
    <div>
        <nav className='flex justify-between items-center p-4 bg-gray-800 overflow-auto gap-3'>
            <h1 className='text-2xl m-2 text-gray-400'>SiteName</h1>
            <div className='flex justify-center items-center gap-5'>
                <input type="email" placeholder='Email' className='p-1 px-2 rounded focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'/>
                <input type="password" placeholder='Password' className='p-1 px-2 rounded focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'/>
                <input type="submit" value="Login" className='text-gray-200 text-lg  bg-green-600 hover:bg-green-500 rounded p-1 px-2 cursor-pointer focus:border-sky-500 focus:ring-sky-500 focus:ring-1'/>
            </div>
        </nav>

        <div className='flex justify-center items-center text-center mt-24'>
            <form className='bg-slate-700 p-2 rounded'>
                <h1 className='text-2xl m-2 text-gray-400'>Sign Up</h1>
                <input type="text" placeholder='Name' className='h-10 p-1 px-2 rounded focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 m-2 w-80'/><br/>
                <input type="email" placeholder='Email' className='h-10 p-1 px-2 rounded focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 m-2 w-80'/><br/>
                <input type="password" placeholder='New Password' className='h-10 p-1 px-2 rounded focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 m-2 w-80'/><br/>
                <input type="submit" value='Sign Up' className='h-10 m-2 text-gray-200 text-lg  bg-blue-600 hover:bg-blue-500 rounded p-1 px-2 cursor-pointer focus:border-sky-500 focus:ring-sky-500 focus:ring-1'/><br/>
            </form>
        </div>
  </div>
  )
}

export default login