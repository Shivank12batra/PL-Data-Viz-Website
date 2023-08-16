import { useQuery } from "react-query";
import { teamShotsData } from "../firestore/getTeamStats";
import { filterShotsData, calculateCumulativeXG, filterDataForShotMap } from "../utils/shotsDataUtils";

export const fetchCumulativeXGChartData = (team, homeTeam, awayTeam) => {
    return useQuery(['cumulativeXGChart', team], () => teamShotsData(team), {
        select: (data) => {
            const filteredData = filterShotsData(data, homeTeam, awayTeam)
            const homeData = calculateCumulativeXG([...filteredData], 'h')
            const awayData = calculateCumulativeXG([...filteredData], 'a')
            return {homeData, awayData}
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        })
}
// return useQuery(['passingEventData', ...args], () => teamPlayerPassingData(args)

export const fetchShotMapData = (team, homeTeam, awayTeam, playerName='') => {
    return useQuery(['shotMap', team], () => teamShotsData(team), {
        select: (data) => {
            const filteredData = filterDataForShotMap(data, team, homeTeam, awayTeam, playerName)
            return filteredData 
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}