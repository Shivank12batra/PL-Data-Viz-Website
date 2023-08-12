import React, {useState} from 'react'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { fetchPlayerData } from '../hooks/getPlayersData'
import { useAuth } from '../context/AuthContext'
import { teamColorMapping } from '../utils/dataUtils'
import { 
    defending, passing, attacking, 
    gkShotStopping, gkPassing, gkSweeping
 } from '../data/playerStats'


const PlayerReport = ({player, position}) => {
  const {team} = useAuth()
  const [typeOfStat, setTypeOfStat] = useState('Percentile')
  const percentile = typeOfStat === 'Percentile'

  const {data, isLoading, error} = fetchPlayerData(team, player, percentile)

  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    return <Error/>
  }
  

  //TODO: refactor non-gk position code to reduce duplication
  return (
  <div className='border-2 pb-4' style={{borderColor: `${teamColorMapping[team].color}`, minHeight: '600px'}}>
    <h2 className='text-white text-2xl font-bold m-4 mx-auto text-center'>
        Player Report
    </h2>
    <div className='flex justify-center text-white m-2'>
        <button className={`${typeOfStat === 'Percentile' && team === 'Tottenham' ? 'text-black' : null} py-2 px-8 border-2 cursor-pointer transition-colors duration-100`} style={{borderColor: `${teamColorMapping[team].color}`, backgroundColor: `${typeOfStat === 'Percentile' ? teamColorMapping[team].color  : ''}`}}
        onClick={() => setTypeOfStat('Percentile')}>
            Percentile
        </button>
        <button className={`${typeOfStat === 'Per 90 Mins' && team === 'Tottenham' ? 'text-black' : null} py-2 px-8 border-2 cursor-pointer transition-colors duration-100`} style={{borderColor: `${teamColorMapping[team].color}`, backgroundColor: `${typeOfStat === 'Per 90 Mins' ? teamColorMapping[team].color  : ''}`}}
        onClick={() => setTypeOfStat('Per 90 Mins')}>
            Per 90 Mins
        </button>
    </div>
    {data ? 
    (position === 'GK' ?
    <div>        
        <h2 className='flex justify-center text-white text-2xl font-bold mt-8 mb-4'>
            GK SHOT STOPPING
        </h2>
        <div className='w-4/5 grid sm:grid-cols-3 mx-auto'>
            {gkShotStopping.map((stat, idx) => {
                return (
                    <div id={idx} className={`${team === 'Tottenham' ? 'text-black' : 'text-white' } text-center p-2 border-2`} style=
                    {{'backgroundColor' : `${teamColorMapping[team].color}`,
                     minHeight: '10px',
                     borderColor: team === 'Tottenham' ? 'black' : 'white',}}>
                        <p style={{minHeight : '50px'}}>{stat}</p>
                        <p className='text-2xl'>{data[stat]}</p>
                    </div>
                )
            })}
        </div>
        <h2 className='flex justify-center text-white text-2xl font-bold mt-8 mb-4'>GK PASSING</h2>
        <div className='w-4/5 grid sm:grid-cols-2 mx-auto'>
            {gkPassing.map((stat, idx) => {
                return (
                    <div id={idx} className={`${team === 'Tottenham' ? 'text-black' : 'text-white' } text-center p-2 border-2`} style=
                    {{'backgroundColor' : `${teamColorMapping[team].color}`,
                     minHeight: '10px',
                     borderColor: team === 'Tottenham' ? 'black' : 'white',}}>
                        <p style={{minHeight : '50px'}}>{stat}</p>
                        <p className='text-2xl'>{data[stat]}</p>
                    </div>
                )
            })}
        </div>
        <h2 className='flex justify-center text-white text-2xl font-bold mt-8 mb-4'>
            GK SWEEPING
        </h2>
        <div className='w-2/4 grid mx-auto'>
            {gkSweeping.map((stat, idx) => {
                return (
                    <div id={idx} className={`${team === 'Tottenham' ? 'text-black' : 'text-white' } text-center p-2 border-2`} style=
                    {{'backgroundColor' : `${teamColorMapping[team].color}`,
                     minHeight: '10px',
                     borderColor: team === 'Tottenham' ? 'black' : 'white',}}>
                        <p style={{minHeight : '50px'}}>{stat}</p>
                        <p className='text-2xl'>{data[stat]}</p>
                    </div>
                )
            })}
        </div>
    </div> : 
    <div>
        <h2 className='flex justify-center text-white text-2xl font-bold mt-8 mb-4'>
            DEFENDING
        </h2>
        <div className='w-4/5 grid sm:grid-cols-3 mx-auto'>
            {defending.map((stat, idx) => {
                return (
                    <div id={idx} className={`${team === 'Tottenham' ? 'text-black' : 'text-white' } text-center p-2 border-2`} style=
                    {{'backgroundColor' : `${teamColorMapping[team].color}`,
                     minHeight: '10px',
                     borderColor: team === 'Tottenham' ? 'black' : 'white',}}>
                        <p style={{minHeight : '50px'}}>{stat}</p>
                        <p className='text-2xl'>{data[stat]}</p>
                    </div>
                )
            })}
        </div>
        <h2 className='flex justify-center text-white text-2xl font-bold mt-8 mb-4'>PASSING</h2>
        <div className='w-4/5 grid sm:grid-cols-3 mx-auto'>
            {passing.map((stat, idx) => {
                return (
                    <div id={idx} className={`${team === 'Tottenham' ? 'text-black' : 'text-white' } text-center p-2 border-2`} style=
                    {{'backgroundColor' : `${teamColorMapping[team].color}`,
                     minHeight: '10px',
                     borderColor: team === 'Tottenham' ? 'black' : 'white',}}>
                        <p style={{minHeight : '50px'}}>{stat}</p>
                        <p className='text-2xl'>{data[stat]}</p>
                    </div>
                )
            })}
        </div>
        <h2 className='flex justify-center text-white text-2xl font-bold mt-8 mb-4'>ATTACKING</h2>
        <div className='w-4/5 grid sm:grid-cols-3 mx-auto'>
            {attacking.map((stat, idx) => {
                return (
                    <div id={idx} className={`${team === 'Tottenham' ? 'text-black' : 'text-white' } text-center p-2 border-2`} style=
                    {{'backgroundColor' : `${teamColorMapping[team].color}`,
                     minHeight: '10px',
                     borderColor: team === 'Tottenham' ? 'black' : 'white',}}>
                        <p style={{minHeight : '50px'}}>{stat}</p>
                        <p className='text-2xl'>{data[stat]}</p>
                    </div>
                )
            })}
        </div>
    </div>) :
     <div className='flex justify-center items-center text-white text-2xl' style={{'height' : '300px'}}>
        PLAYER NOT FOUND
    </div>
    }
  </div>
  )
}

export default PlayerReport