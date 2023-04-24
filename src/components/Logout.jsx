import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Logout = () => {
  const navigate = useNavigate()
  const {logout} = useAuth()

  const logoutUser = async() => {
    try {
        await logout()
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className='fixed inset-0 h-screen flex flex-row items-center justify-center bg-gray-900 bg-opacity-50'>
        <div className='bg-white px-4 pt-5 pb-4 sm:p-6 text-center sm:w-1/3 w-3/4 rounded-md'>
            <h1 className='sm:text-left text-2xl font-bold mb-4'>Do you want to logout?</h1>
            <div className='text-center'>
            <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4  mb-2 block mx-auto cursor-pointer w-2/4 rounded-full' onClick={logoutUser}>log out</button>
            <Link to='/' className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded block mx-auto cursor-pointer w-2/4 rounded-full'>cancel</Link>
            </div>
        </div>
    </div>
  )
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <p className="text-gray-700 text-lg">Are you sure you want to logout?</p>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              No
            </button>
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Logout