import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const playersData = async(team) => {
    try {
        const playersDataRef = collection(db, 'teamPlayersData')
        const q = query(playersDataRef, where("name", "==", team))
        const querySnapshot = await getDocs(q)
        const playersDoc = querySnapshot.docs[0]
        const playersData = playersDoc.data().data

        return playersData
    } catch (error) {
        console.log(error)
        return new Error('Something went wrong!');
    }
}