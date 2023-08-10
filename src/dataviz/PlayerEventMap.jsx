import React, {useState, useEffect, useRef} from 'react'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { fetchShotMapData } from '../hooks/getShotsData'
import { fetchPassingEventData } from '../hooks/getPassingEventData'
import { useAuth } from '../context/AuthContext'
import { pitchConfig } from '../utils/pitchUtils'
import { teamColorMapping } from '../utils/dataUtils'

const PlayerEventMap = ({homeTeam, awayTeam, player}) => {
  const {team} = useAuth()
  const [mapType, setMapType] = useState('Shotmap')
  const chartRef = useRef(null)

  const {data, isLoading, error} = fetchShotMapData(team, homeTeam, awayTeam, player)

  console.log(data)

  const eventMap = () => {

  }

  useEffect(() => {
    eventMap()
  }, [data])

  if (isLoading) {
    return <Loader/>
  }
  
  if (error) {
    return <Error/>
   }
  
  return (
    <div className='border-2 min-h-500' style={{borderColor: `${teamColorMapping[team].color}`}}>
    <h2 className='text-white text-2xl font-bold m-4 mx-auto text-center'>
        Player Event Map
    </h2>
    <div className='flex justify-center text-white m-2'>
        <button className={`${mapType === 'Shotmap' && team === 'Tottenham' ? 'text-black' : null} py-2 px-8 border-2 cursor-pointer transition-colors duration-100`} style={{borderColor: `${teamColorMapping[team].color}`, backgroundColor: `${mapType === 'Shotmap' ? teamColorMapping[team].color  : ''}`}}
        onClick={() => setMapType('Shotmap')}>
            Shotmap
        </button>
        <button className={`${mapType === 'Other Events' && team === 'Tottenham' ? 'text-black' : null} py-2 px-8 border-2 cursor-pointer transition-colors duration-100`} style={{borderColor: `${teamColorMapping[team].color}`, backgroundColor: `${mapType === 'Other Events' ? teamColorMapping[team].color  : ''}`}}
        onClick={() => setMapType('Other Events')}>
            Other Events
        </button>
    </div>
    <div id='chart' ref={chartRef} className='flex justify-center mt-8'/>
  </div>
  )
}

export default PlayerEventMap