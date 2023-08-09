import React, {useState} from 'react'
import TeamTable from './TeamTable'
import XgChart from '../dataviz/XgChart'
import PassingNetwork from '../dataviz/PassingNetwork'
import TeamShotMap from '../dataviz/TeamShotMap'
import { QueryTest } from './QueryTest'
import { useAuth } from '../context/AuthContext'
import teams from '../data/team'

const TeamStats = () => {
  const {team} = useAuth()
  const [selectedData, setSelectedData] = useState({
    oppositionTeam: team === teams[0] ? teams[1] : teams[0],
    venue: 'Home'
  })

  const homeTeam = selectedData.venue === 'Home' ? team : selectedData.oppositionTeam
  const awayTeam = selectedData.venue === 'Away' ? team : selectedData.oppositionTeam

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setSelectedData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  return (
    <div className='bg-gradient-to-b from-black to-gray-800 border-2 border-solid border-transparent'>
      <TeamTable/>
      <QueryTest/>
      <div className='flex flex-col items-center mt-24'>
        <h1 className='text-white text-4xl font-bold mb-6 mx-auto underline underline-offset-4 text-center'>TEAM DATA VISUALIZATIONS</h1>
        <div className='flex flex-col justify-between items-center items-between m-4 sm:flex-row sm:justify-between'>
          <div>
            <h3 className='text-white text-xl text-center font-bold mb-2'>Against</h3>
            <select className='px-4 py-2 text-center border border-gray-400 rounded-lg shadow-md hover:cursor-pointer'
            name='oppositionTeam'
            value={selectedData.oppositionTeam}
            onChange={handleInputChange}>
            {teams.map(squad => { 
              return squad !== team ? <option className='bg-gray-800 hover:cursor-pointer text-white'>{squad}</option> : null
            })}
            </select>
          </div>
          <div className='sm:ml-4 ml-0 mt-4 sm:mt-0'>
            <h3 className='text-white text-xl text-center font-bold mb-2'>Venue</h3>
            <select className='px-12 py-2 border border-gray-400 rounded-lg shadow-md hover:cursor-pointer'
            name='venue'
            value={selectedData.venue}
            onChange={handleInputChange}>
              <option className='bg-gray-800 hover:cursor-pointer text-white'>Home</option>
              <option className='bg-gray-800 hover:cursor-pointer text-white'>Away</option>
            </select>
          </div>
        </div>
      </div>
      <div className='grid sm:grid-cols-3 gap-8 md:grid-cols-1'>
          <XgChart homeTeam={homeTeam} awayTeam={awayTeam}/>
          <PassingNetwork homeTeam={homeTeam} awayTeam={awayTeam} venue={selectedData.venue}/> 
          <TeamShotMap homeTeam={homeTeam} awayTeam={awayTeam}/>
      </div>
    </div>
  )
}

export default TeamStats