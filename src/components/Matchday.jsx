import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { MdClose } from 'react-icons/md'

const Matchday = () => {
  const navigate = useNavigate()
  return (
    <div className='fixed inset-0 h-screen flex flex-row items-center justify-center bg-gradient-to-b from-black to-gray-800 bg-opacity-50'>
        <div className='relative bg-white px-4 pt-5 pb-4 sm:p-6 text-center sm:w-1/3 w-3/4 rounded-md mx-auto text-center'>
            <button className="absolute top-2 right-2 text-gray-800 hover:text-gray-500" onClick={() => navigate('/')}>
                <MdClose className="h-8 w-8"/>
            </button>
            <p className='text-xl font-bold my-8 text-center'>
            The matchday section is under construction and will soon be unleashed with the v2 update! 
            </p>
        </div>
    </div>
  )
}


export default Matchday