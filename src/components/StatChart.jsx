import React from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import Error from './Error'
import { fetchTopPlayersData } from '../hooks/getPlayersData'
import { useAuth } from '../context/AuthContext'

const StatChart = () => {
  const {team} = useAuth()
  const {stat} = useParams()
  
  const transformStat = stat === 'Pass%20Completion%20%' ? 'Pass Completion %' : stat

  const {data, isLoading, error} = fetchTopPlayersData(team, transformStat)

  console.log(data)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <Error />
  }

  return (
    <div className='bg-gradient-to-b from-black to-gray-800 border-2 border-solid border-transparent min-h-screen'>
      <h1 className='text-white text-4xl font-bold mb-6 mx-auto underline underline-offset-4 text-center mt-32'>{transformStat.toUpperCase()} CHART</h1>
    </div>
  )
}

export default StatChart