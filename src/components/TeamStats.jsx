import React from 'react'
import TeamTable from './TeamTable'
import XgChart from '../dataviz/XgChart'
import PassingNetwork from '../dataviz/PassingNetwork'
import TeamShotMap from '../dataviz/TeamShotMap'
import { QueryTest } from './QueryTest'

const TeamStats = () => {
  return (
    <div className='bg-gradient-to-b from-black to-gray-800 border-2 border-solid border-transparent'>
      <TeamTable/>
      <QueryTest/>
      <div className='flex flex-col items-center mt-24'>
        <h1 className='text-white text-4xl font-bold mb-6 mx-auto underline underline-offset-4 text-center'>TEAM DATA VISUALIZATIONS</h1>
        <div className='flex flex-row justify-between items-between m-4'>
          <div>
            <h3 className='text-white text-xl text-center font-bold mb-2'>Against</h3>
            <select className='px-12 py-2 border border-gray-400 rounded-lg shadow-md hover:cursor-pointer'>
              <option>22-23</option>
            </select>
          </div>
          <div className='ml-4'>
            <h3 className='text-white text-xl text-center font-bold mb-2'>Venue</h3>
            <select className='px-12 py-2 border border-gray-400 rounded-lg shadow-md hover:cursor-pointer'>
              <option>Home</option>
              <option>Away</option>
            </select>
          </div>
        </div>
      </div>
      <div className='grid sm:grid-cols-3 gap-8 md:grid-cols-1'>
        <div className='border-2 border-red-500'>
          <XgChart/>
        </div>
        <div className='border-2 border-red-500'>
          <PassingNetwork/> 
        </div>
        <div className='border-2 border-red-500'>
          <TeamShotMap/>
        </div>
      </div>
    </div>
  )
}

export default TeamStats

// bg-gradient-to-b from-black to-gray-800