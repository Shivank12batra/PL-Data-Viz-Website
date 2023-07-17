import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const teamShotsData = async (team) => {
    try {
        const teamShotsRef = collection(db, 'teamShotsData')
        const q = query(teamShotsRef, where("name", "==", team))
        const querySnapshot = await getDocs(q)
        const shotsDoc = querySnapshot.docs[0]
        const shotsData = shotsDoc.data().data
        return shotsData
    } catch(error) {
        console.log(error)
        return error
    }
}

export const teamPassingNetworkData = async (args) => {
    try {
        const [team, homeTeam, awayTeam, venue] = args
        const passingNetworkCollection = `${team.toLowerCase()}PassingNetworkData`
        const documentName = `${homeTeam}_${awayTeam}_${venue}`
        console.log(documentName)
        const passingNetworkRef = doc(db, passingNetworkCollection, documentName)

        const documentSnapshot = await getDoc(passingNetworkRef)
        if (documentSnapshot.exists()) {
            return documentSnapshot.data();
        } else {
            return undefined
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const teamPlayerPassingData = async (args) => {
    try {
        const [team, homeTeam, awayTeam, venue, event, eventOutcome, playerName] = args
        const playerPassingData = `${team.toLowerCase()}PlayerPassingData`
        const documentName = `${homeTeam}_${awayTeam}_${venue}`
        
        const queryRef = query(
            collection(db, `${playerPassingData}/${documentName}/eventData`),
            where("type_displayName", "==", event),
            where("outcomeType_displayName", "==", eventOutcome),
            where("name", "==", playerName)
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
        return error
    }
}