import { playersData } from "../firestore/getPlayerStats"

export const filterByStat = (playersData, stat) => {
    const filterPlayersData = playersData.filter(player => player['Per 90'][`${stat}`])
    const sortedPlayersData = filterPlayersData.sort((a, b) => b['Per 90'][`${stat}`] - a['Per 90'][`${stat}`])
    // filtering and removing percentile key which is not needed
    const finalSortedData = sortedPlayersData.map(({ Percentile, ...rest }) => rest)
    return finalSortedData
}

export const filterByPlayerNameAndStatType = (playersData, playerName, percentile) => {
    const typeOfStat = percentile ? 'Percentile' : 'Per 90'
    const playerData = playersData.filter(player => player.name === playerName).map(player => player[`${typeOfStat}`])[0]
    return playerData
}