import React from 'react'
import TeamTable from './TeamTable'
import XgChart from '../dataviz/XgChart'
import PassingNetwork from '../dataviz/PassingNetwork'
import TeamShotMap from '../dataviz/TeamShotMap'
import { QueryTest } from './QueryTest'

const TeamStats = () => {
  return (
    <div style={{ border: "2px solid transparent" }} className='bg-gradient-to-b from-black to-gray-800 '>
      <TeamTable/>
      <QueryTest/>
      <XgChart/>
      <PassingNetwork/> 
      <TeamShotMap/>
    </div>
  )
}

export default TeamStats

// bg-gradient-to-b from-black to-gray-800