import React, { useState, useEffect } from 'react'
import { teamShotsData, teamPassingNetworkData, teamPlayerPassingData } from '../firestore/getTeamStats'
import { useAuth } from '../context/AuthContext'

export const QueryTest = () => {
    const {team} = useAuth()
    const [data, setData] = useState([])
  useEffect(() => {
    const getData = async() => {
        // const response = await teamPlayerPassingData('Tottenham', 'Arsenal', 'Tottenham', 'Away', 'Pass', 'Successful', 'Eric Dier')
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
