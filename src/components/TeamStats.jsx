import React from 'react'
import TeamTable from './TeamTable'
import { QueryTest } from './QueryTest'

const TeamStats = () => {
  return (
    <div style={{ border: "2px solid transparent" }} className='bg-gradient-to-b from-black to-gray-800 '>
      <TeamTable/>
      <QueryTest/>
    </div>
  )
}

export default TeamStats

// bg-gradient-to-b from-black to-gray-800