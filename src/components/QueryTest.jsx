import React from 'react'
import { fetchCumulativeXGChartData } from '../hooks/getShotsData'
import { useAuth } from '../context/AuthContext'

export const QueryTest = () => {
  const team = useAuth()
  const {data, isLoading, error, refetch} = fetchCumulativeXGChartData('Arsenal', 'Arsenal', 'Tottenham')

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
