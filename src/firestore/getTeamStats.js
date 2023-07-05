import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const teamShotsData = async (team) => {
    try {
        const teamShotsRef = collection(db, 'teamShotsData')
        const q = query(teamShotsRef, where("name", "==", team))
        const querySnapshot = await getDocs(q)
        const shotsDoc = querySnapshot.docs[0]
        const shotsData = shotsDoc.data()
        return shotsData
    } catch(e) {
        console.log(error)
        return new Error('Something went wrong!');
    }
}

export const teamPassingNetworkData = async (...args) => {
    try {
        const [team, homeTeam, awayTeam, venue] = args
        const passingNetworkCollection = `${team.toLowerCase()}PassingNetworkData`
        const documentName = `${homeTeam}_${awayTeam}_${venue}`
        const passingNetworkRef = doc(db, passingNetworkCollection, documentName)

        const documentSnapshot = await getDoc(passingNetworkRef)
        if (documentSnapshot.exists()) {
            return documentSnapshot.data();
        } else {
            return undefined
        }

    } catch (error) {
        console.log(error)
        return new Error('Something went wrong!');
    }
}

export const teamPlayerPassingData = async (...args) => {
    try {
        const [team, homeTeam, awayTeam, venue, event, eventOutcome, playerName = ''] = args
        const playerPassingData = `${team.toLowerCase()}PlayerPassingData`
        const documentName = `${homeTeam}_${awayTeam}_${venue}`
        
        const queryRef = query(
            collection(db, `${playerPassingData}/${documentName}/eventData`),
            where("type_displayName", "==", event),
            where("outcomeType_displayName", "==", eventOutcome),
            playerName ? where("name", "==", playerName) : null
        );
        
        const querySnapshot = await getDocs(queryRef);

        if (!querySnapshot.empty) {
            const data = querySnapshot.docs.map((doc) => doc.data());
            return data;
        } else {
            return undefined;
        }
    } catch (error) {
        console.log(error)
        return new Error('Something went wrong!');
    }
}

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
    const typeOfStat = percentile ? 'Percentile' : 'Per 90'
    const playersDataRef = collection(db, 'teamPlayersData')
    const q = query(playersDataRef, where("name", "==", team))
    const querySnapshot = await getDocs(q)
    const playersDoc = querySnapshot.docs[0]
    const playersData = playersDoc.data().data

    const playerData = playersData.filter(player => player.name === playerName).map(player => player[`${typeOfStat}`])[0]
    return playerData
}