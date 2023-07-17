import React, { useState, useEffect } from 'react'
import { fetchCumulativeXGChartData, fetchShotMapData } from '../hooks/getShotsData'
import { fetchPassingNetworkData } from '../hooks/getPassingNetworkData'
import { fetchPassingEventData } from '../hooks/getPassingEventData'
import { teamPlayerPassingData } from '../firestore/getTeamStats'
import { fetchTopPlayersData, fetchPlayerData } from '../hooks/getPlayersData'
import { useAuth } from '../context/AuthContext'

export const QueryTest = () => {
  const {team} = useAuth()
  // const [data, setData] = useState([])

  // const {data, isLoading, error, refetch} = fetchCumulativeXGChartData('Arsenal', 'Arsenal', 'Tottenham')

  // if (isLoading) {
  //   return <div>Loading</div>
  // }

  // if (error) {
  //   return <div>Something went wrong!</div>
  // }

  // if (data) {
  //   console.log(data)
  // }
  return (
    <div>

    </div>
  )
}
