import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { IPlayerData, TTopSixTeam } from "../types";

export const playersData = async (team: TTopSixTeam) => {
  const playersDataRef = collection(db, "teamPlayersData");
  const q = query(playersDataRef, where("name", "==", team));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const playersDoc = querySnapshot.docs[0];
    const playersData: IPlayerData[] = playersDoc.data().data;
    return playersData;
  } else {
    return undefined;
  }
};
