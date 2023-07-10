import React from 'react'
import { fetchCumulativeXGChartData, fetchShotMapData } from '../hooks/getShotsData'
import { useAuth } from '../context/AuthContext'

export const QueryTest = () => {
  const {team} = useAuth()
  console.log(team)
  const {data, isLoading, error, refetch} = fetchShotMapData(team, team, 'Tottenham', 'Bukayo Saka')

  if (isLoading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Something went wrong!</div>
  }
  return (
    <div>
        {console.log(data)}
    </div>
  )
}
