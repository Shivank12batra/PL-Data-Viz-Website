import { useQuery } from "react-query";
import { playersData } from "../firestore/getPlayerStats";
import { filterByStat, filterByPlayerNameAndStatType } from "../utils/playersDataUtils";

export const fetchTopPlayersData = (team, stat) => {
    return useQuery('topPlayersData', () => playersData(team), {
        select: (data) => {
            const filteredPlayersData = filterByStat(data, stat) 
            return filteredPlayersData
        }
    })
}

export const fetchPlayerData = (team, playerName, percentile=false) => {
    return useQuery('playerData', () => playersData(team), {
        select: (data) => {
            const playerData = filterByPlayerNameAndStatType(data, playerName, percentile)
            return playerData
        }
    })
}