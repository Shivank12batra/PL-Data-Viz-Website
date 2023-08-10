import React, {useState} from 'react'
import PlayerCards from './PlayerCards'
import PlayerReport from '../dataviz/PlayerReport'
import PlayerEventMap from '../dataviz/PlayerEventMap'
import { fetchPlayerData } from '../hooks/getPlayersData'
import { useAuth } from '../context/AuthContext'
import teams from '../data/team'

const PlayerStats = () => {
  const {team} = useAuth()
  const {data} = fetchPlayerData(team, '')
  const [selectedData, setSelectedData] = useState({
    player: data && data?.length > 0 ? data[0].name : '',
    oppositionTeam: team === teams[0] ? teams[1] : teams[0],
    venue: 'Home'
  })

  const playerData = data?.filter(players => players.name === selectedData.player)[0]

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
    <div className='bg-gradient-to-b from-black to-gray-800 border-2 border-solid border-transparent min-h-screen'>
      <PlayerCards/>
      <h1 className='text-white text-4xl font-bold mt-12 mb-6 mx-auto underline underline-offset-4 text-center'>PLAYER DATA VISUALIZATIONS</h1>
      <div className='flex flex-col justify-between items-center items-between m-4 sm:flex-row sm:justify-center'>
          <div>
            <h3 className='text-white text-xl text-center font-bold mb-2'>Player</h3>
            <select className='px-1 py-2 text-center border border-gray-400 rounded-lg shadow-md hover:cursor-pointer mr-4'
            name='player'
            value={selectedData.player}
            onChange={handleInputChange}>
            {data?.map(player => { 
              return <option className='bg-gray-800 hover:cursor-pointer text-white'>
                {player.name}
              </option>
            })}
            </select>
          </div>
          <div>
            <h3 className='text-white text-xl text-center font-bold mb-2 mt-4 sm:mt-0'>
              Against
            </h3>
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
      <div className='grid sm:grid-cols-2 gap-8 md:grid-cols-1'>
        <PlayerReport player={selectedData.player} position={playerData?.position}/>
        <PlayerEventMap/>
      </div>
    </div>
  )
}

export default PlayerStats