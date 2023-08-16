import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const teamShotsData = async (team) => {
    const teamShotsRef = collection(db, 'teamShotsData');
    const q = query(teamShotsRef, where("name", "==", team));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const shotsDoc = querySnapshot.docs[0];
        const shotsData = shotsDoc.data().data;
        return shotsData;
    } else {
        return undefined;
    }
}

export const teamPassingNetworkData = async (args) => {
    const [team, homeTeam, awayTeam, venue] = args
    const passingNetworkCollection = team === 'Manchester City' || 'Manchester United' ? `${team.split(' ').join('-').toLowerCase()}PassingNetworkData` : `${team.toLowerCase()}PassingNetworkData`
    const documentName = `${homeTeam}_${awayTeam}_${venue}`
    const passingNetworkRef = doc(db, passingNetworkCollection, documentName)

    const documentSnapshot = await getDoc(passingNetworkRef)
    if (documentSnapshot.exists()) {
        return documentSnapshot.data()
    } else {
        return undefined
    }
}

export const teamPlayerPassingData = async (args) => {
    const [team, homeTeam, awayTeam, venue, event, eventOutcome, playerName] = args
    const playerPassingData = team === 'Manchester City' || 'Manchester United' ? `${team.split(' ').join('-').toLowerCase()}PlayerPassingData` : `${team.toLowerCase()}PlayerPassingData`
    const documentName = `${homeTeam}_${awayTeam}_${venue}`

    const sampleQueryRef = query(
            collection(db, `${playerPassingData}/${documentName}/eventData`),
            where("type_displayName", "==", event)
            )
    const sampleQuerySnap = await getDocs(sampleQueryRef)
    
    if (!sampleQuerySnap.empty) {
        const queryRef = query(
            collection(db, `${playerPassingData}/${documentName}/eventData`),
            where("type_displayName", "==", event),
            where("outcomeType_displayName", "==", eventOutcome),
            where("name", "==", playerName)
        );
        
        const querySnapshot = await getDocs(queryRef);

        if (!querySnapshot.empty) {
            const data = querySnapshot.docs.map((doc) => doc.data())
            return data
        } else {
            return []
        }
    }
    return undefined
}