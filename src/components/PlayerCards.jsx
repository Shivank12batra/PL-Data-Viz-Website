import React from 'react'
import { defending, passing, attacking } from '../data/playerStats'
import PlayerCard from '../dataviz/PlayerCard'
import { useAuth } from '../context/AuthContext'

const PlayerCards = () => {
  const {team} = useAuth()
  return (
    <div className='items-center border-transparent border-2 mt-32'>
        <h1 className='text-white text-4xl font-bold mb-6 underline underline-offset-4 text-center'>
            PLAYER STATS RANKING
        </h1>
        <h2 className='flex justify-center text-white text-2xl font-bold mt-16 mb-8'>DEFENDING (PER 90 MINS)</h2>
        <div className='w-4/5 grid sm:grid-cols-3 gap-8 md:grid-cols-1 mx-auto'>
            {defending.map((stat, idx) => {
                return (
                    <PlayerCard id={idx} stat={stat}/>
                )
            })}
        </div>
        <h2 className='flex justify-center text-white text-2xl font-bold mt-16 mb-8'>PASSING (PER 90 MINS)</h2>
        <div className='w-4/5 grid sm:grid-cols-3 gap-8 md:grid-cols-1 mx-auto'>
            {passing.map((stat, idx) => {
                return (
                    <PlayerCard id={idx} stat={stat}/>
                )
            })}
        </div>
        <h2 className='flex justify-center text-white text-2xl font-bold mt-16 mb-8'>ATTACKING (PER 90 MINS)</h2>
        <div className='w-4/5 grid sm:grid-cols-3 gap-8 md:grid-cols-1 mx-auto'>
            {attacking.map((stat, idx) => {
                return (
                    <PlayerCard id={idx} stat={stat}/>
                )
            })}
        </div>
    </div>
  )
}

export default PlayerCards