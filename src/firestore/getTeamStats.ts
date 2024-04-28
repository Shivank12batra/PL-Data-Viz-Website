import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  IPassingData,
  IPassingNetworkData,
  TShotData,
  TTeam,
  TTopSixTeam,
  TVenue,
} from "../types";

export interface ITeamPassingNetworkDataProps {
  team: TTopSixTeam;
  homeTeam: TTeam;
  awayTeam: TTeam;
  venue: TVenue;
}

export interface ITeamPlayerPassingDataProps
  extends ITeamPassingNetworkDataProps {
  event: string; // TODO: can give a better/narrow type
  eventOutcome: string; // TODO: can give a better/narrow type
  playerName: string;
}

export const teamShotsData = async (team: TTopSixTeam) => {
  const teamShotsRef = collection(db, "teamShotsData");
  const q = query(teamShotsRef, where("name", "==", team));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const shotsDoc = querySnapshot.docs[0];
    const shotsData: TShotData[] = shotsDoc.data().data;
    return shotsData;
  } else {
    return undefined;
  }
};

export const teamPassingNetworkData = async ({
  team,
  homeTeam,
  awayTeam,
  venue,
}: ITeamPassingNetworkDataProps) => {
  const passingNetworkCollection =
    team === "Manchester City" || "Manchester United"
      ? `${team.split(" ").join("-").toLowerCase()}PassingNetworkData`
      : `${team.toLowerCase()}PassingNetworkData`;

  const documentName = `${homeTeam}_${awayTeam}_${venue}`;
  const passingNetworkRef = doc(db, passingNetworkCollection, documentName);

  const documentSnapshot = await getDoc(passingNetworkRef);
  if (documentSnapshot.exists()) {
    const data = documentSnapshot.data() as IPassingNetworkData;
    return data;
  } else {
    return undefined;
  }
};

export const teamPlayerPassingData = async ({
  team,
  homeTeam,
  awayTeam,
  venue,
  event,
  eventOutcome,
  playerName,
}: ITeamPlayerPassingDataProps) => {
  const playerPassingData =
    team === "Manchester City" || "Manchester United"
      ? `${team.split(" ").join("-").toLowerCase()}PlayerPassingData`
      : `${team.toLowerCase()}PlayerPassingData`;
  const documentName = `${homeTeam}_${awayTeam}_${venue}`;

  const sampleQueryRef = query(
    collection(db, `${playerPassingData}/${documentName}/eventData`),
    where("type_displayName", "==", event)
  );
  const sampleQuerySnap = await getDocs(sampleQueryRef);

  if (!sampleQuerySnap.empty) {
    const queryRef = query(
      collection(db, `${playerPassingData}/${documentName}/eventData`),
      where("type_displayName", "==", event),
      where("outcomeType_displayName", "==", eventOutcome),
      where("name", "==", playerName)
    );

    const querySnapshot = await getDocs(queryRef);

    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map((doc) =>
        doc.data()
      ) as unknown as IPassingData[];
      return data;
    } else {
      return [];
    }
  }
  return undefined;
};
