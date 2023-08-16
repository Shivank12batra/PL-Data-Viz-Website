import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { fetchTopPlayersData } from '../hooks/getPlayersData';
import { teamColorMapping } from '../utils/dataUtils';
import { useAuth } from '../context/AuthContext';

const PlayerCard = ({ stat }) => {
  const { team } = useAuth()

  const { data, isLoading, error } = fetchTopPlayersData(team, stat)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <Error />
  }

  const top5Players = data.slice(0, 5)

  return (
    <div className='bg-black text-white rounded-lg p-4' style={{
        borderColor: teamColorMapping[team].color,
        borderWidth: "2px",
      }}>
      {top5Players.map((player, index) => (
        <div>
            {index === 0 ? (
                <div className='flex flex-col text-white'>
                    <div className='flex flex-row justify-between text-2xl font-bold'>
                        <span>{stat}</span>
                        <span>{player['Per 90'][stat]}</span>
                    </div>
                    <div className='flex flex-row justify-between mt-4'>
                        <div className='mt-8'>
                            <p>{player.name}</p>
                            <p>{player.minutes} minutes</p>
                        </div>
                        <div>
                            <img src={player.image_url} alt={player.name} className='w-20 h-20 rounded-full'/>
                        </div>
                    </div>
                </div>
            ) :
             <div className='flex flex-row justify-between text-white mt-2'>
                <div>
                    <span>{index + 1}.</span>
                    <span className='ml-2'>{player.name}</span>
                </div>
                <div>
                    <span>{player['Per 90'][stat]}</span>
                </div>
            </div>
            }
           <span className="h-0.5 block w-full" style={{ backgroundColor: teamColorMapping[team].color }}></span>
        </div>
      ))}
      <Link to={`/player-stats/${stat}`} className={`${team === 'Tottenham' ? 'text-black' : 'text-white'} w-4/5 flex justify-center mx-auto text-center mt-4 p-2 rounded-full`} style={{
            backgroundColor: teamColorMapping[team]?.color,
            borderColor: teamColorMapping[team]?.color,
        }}>
        View All
      </Link>
    </div>
  );
};

export default PlayerCard

