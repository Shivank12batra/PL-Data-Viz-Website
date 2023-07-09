import { useQuery } from "react-query";
import { teamShotsData } from "../firestore/getTeamStats";
import { filterDataForXGChart, calculateCumulativeXG } from "../utils/filterShotsData";

export const fetchCumulativeXGChartData = (team, homeTeam, awayTeam) => {
   return useQuery('cumulativeXGChart', () => teamShotsData(team), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (data) => {
        const filteredData = filterDataForXGChart(data, homeTeam, awayTeam)
        const homeData = calculateCumulativeXG([...filteredData], 'h')
        const awayData = calculateCumulativeXG([...filteredData], 'a')
        return {homeData, awayData}
    }
    })
}

export const fetchShotMapData = (team) => {
    return useQuery('shotMap', () => teamShotsData(team)), {
        select: (data) => {
            return data
        }
    }
}