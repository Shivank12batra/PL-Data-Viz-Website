import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { MdClose } from 'react-icons/md'

const Logout = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {logout} = useAuth()

  const logoutUser = async() => {
    try {
        setError('')
        await logout()
        navigate('/')
    } catch (error) {
        setError('Oops! something went wrong')
        console.log(error)
    }
  }
  return (
    <div className='fixed inset-0 h-screen flex flex-row items-center justify-center bg-gradient-to-b from-black to-gray-800 bg-opacity-50'>
        <div className='relative bg-white px-4 pt-5 pb-4 sm:p-6 text-center sm:w-1/3 w-3/4 rounded-md'>
            <button className="absolute top-2 right-2 text-gray-800 hover:text-gray-500" onClick={() => navigate('/')}>
                <MdClose className="h-8 w-8"/>
            </button>
            <h1 className='sm:text-left text-2xl font-bold mb-4'>Do you want to logout?</h1>
            <div className='text-center'>
              <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4  mb-2 block mx-auto cursor-pointer w-2/4 rounded-full' onClick={logoutUser}>
                log out
              </button>
              <Link to='/' className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded block mx-auto cursor-pointer w-2/4 rounded-full'>
                cancel
              </Link>
              <p className='text-red-600 mt-2'>
                {error}
                </p>
            </div>
        </div>
    </div>
  )
}


export default Logout