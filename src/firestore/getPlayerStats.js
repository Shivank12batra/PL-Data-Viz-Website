import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const topPlayersData = async(team, stat) => {
    try {
        const playersDataRef = collection(db, 'teamPlayersData')
        const q = query(playersDataRef, where("name", "==", team))
        const querySnapshot = await getDocs(q)
        const playersDoc = querySnapshot.docs[0]
        const playersData = playersDoc.data().data

        const filterPlayersData = playersData.filter(player => player['Per 90'][`${stat}`])
        const sortedPlayersData = filterPlayersData.sort((a, b) => b['Per 90'][`${stat}`] - a['Per 90'][`${stat}`])
        return sortedPlayersData
    } catch (error) {
        console.log(error)
        return new Error('Something went wrong!');
    }
}

export const playerData = async(team, playerName, percentile=false) => {
    try {
        const typeOfStat = percentile ? 'Percentile' : 'Per 90'
        const playersDataRef = collection(db, 'teamPlayersData')
        const q = query(playersDataRef, where("name", "==", team))
        const querySnapshot = await getDocs(q)
        const playersDoc = querySnapshot.docs[0]
        const playersData = playersDoc.data().data

        const playerData = playersData.filter(player => player.name === playerName).map(player => player[`${typeOfStat}`])[0]
        return playerData
    } catch (error) {
        console.log(error)
        return new Error('Something went wrong!')
    }
}