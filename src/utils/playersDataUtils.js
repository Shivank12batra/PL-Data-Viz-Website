import { playersData } from "../firestore/getPlayerStats"

export const filterByStat = (playersData, stat) => {
    const filterPlayersData = playersData.filter(player => player['Per 90'][stat] && player['minutes'] > 500)
    const sortedPlayersData = filterPlayersData.sort((a, b) => compareStats(a['Per 90'][stat], b['Per 90'][stat]))
    // filtering and removing percentile key which is not needed
    const finalSortedData = sortedPlayersData.map(({ Percentile, ...rest }) => rest)
    return finalSortedData
}

// Custom comparison function to handle percentage values
const compareStats = (statA, statB) => {
    const percentageRegex = /^(\d+(\.\d+)?)%$/;

    const isPercentage = (value) => percentageRegex.test(value);

    const parsePercentage = (value) => parseFloat(value.replace('%', ''));

    if (isPercentage(statA) && isPercentage(statB)) {
        const parsedA = parsePercentage(statA);
        const parsedB = parsePercentage(statB);
        return parsedB - parsedA; // Sorting in descending order
    } else {
        return statB - statA; // Default numeric sorting
    }
};

export const filterByPlayerNameAndStatType = (playersData, playerName, percentile) => {
    const typeOfStat = percentile ? 'Percentile' : 'Per 90'
    const playerData = playersData.filter(player => player.name === playerName).map(player => player[`${typeOfStat}`])[0]
    return playerData
}