import { playersData } from "../firestore/getPlayerStats"

export const filterByStat = (playersData, stat) => {
    const filterPlayersData = playersData.filter(player => player['Per 90'][`${stat}`])
    const sortedPlayersData = filterPlayersData.sort((a, b) => b['Per 90'][`${stat}`] - a['Per 90'][`${stat}`])
    return sortedPlayersData
}

export const filterByPlayerNameAndStatType = (playersData, playerName, percentile) => {
    const typeOfStat = percentile ? 'Percentile' : 'Per 90'
    const playerData = playersData.filter(player => player.name === playerName).map(player => player[`${typeOfStat}`])[0]
    return playerData
}