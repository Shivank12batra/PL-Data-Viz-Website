import { useQuery } from "react-query";
import { teamShotsData } from "../firestore/getTeamStats";
import { filterShotsData, calculateCumulativeXG, filterDataForShotMap } from "../utils/shotsDataUtils";

export const fetchCumulativeXGChartData = (team, homeTeam, awayTeam) => {
   return useQuery('cumulativeXGChart', () => teamShotsData(team), {
    select: (data) => {
        const filteredData = filterShotsData(data, homeTeam, awayTeam)
        const homeData = calculateCumulativeXG([...filteredData], 'h')
        const awayData = calculateCumulativeXG([...filteredData], 'a')
        return {homeData, awayData}
    }
    })
}

export const fetchShotMapData = (team, homeTeam, awayTeam, playerName='') => {
    return useQuery('shotMap', () => teamShotsData(team), {
        select: (data) => {
            const filteredData = filterDataForShotMap(data, team, homeTeam, awayTeam, playerName)
            return filteredData 
        }
    })
}