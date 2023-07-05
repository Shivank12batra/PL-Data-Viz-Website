import React, { useState, useEffect } from 'react'
import { 
    teamShotsData, teamPassingNetworkData,
     teamPlayerPassingData, topPlayersData, playerData }
      from '../firestore/getTeamStats'
import { useAuth } from '../context/AuthContext'

export const QueryTest = () => {
    const {team} = useAuth()
    const [data, setData] = useState([])
  useEffect(() => {
    const getData = async() => {
        // const response = await playerData('Arsenal', 'Bukayo Saka')
        // setData(response)
    }
    getData()
  }, [])

  return (
    <div>
        {console.log(data)}
    </div>
  )
}
