import { useQuery } from "react-query";
import { playersData } from "../firestore/getPlayerStats";
import {
  filterByStat,
  filterByPlayerNameAndStatType,
} from "../utils/playersDataUtils";
import { TPlayerStat, TTopSixTeam } from "../types";

interface IFetchTopPlayersDataProps {
  team: TTopSixTeam;
  stat: TPlayerStat;
}

interface IFetchPlayerDataProps {
  team: TTopSixTeam;
  playerName: string;
  percentile: boolean;
}

export const fetchTopPlayersData = ({
  team,
  stat,
}: IFetchTopPlayersDataProps) => {
  return useQuery(["topPlayersData", team], () => playersData(team), {
    select: (data) => {
      const filteredPlayersData = filterByStat({ playersData: data, stat });
      return filteredPlayersData;
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const fetchPlayerData = ({
  team,
  playerName,
  percentile = false,
}: IFetchPlayerDataProps) => {
  return useQuery(["playerData", team], () => playersData(team), {
    select: (data) => {
      if (!playerName) return data;
      const playerData = filterByPlayerNameAndStatType({
        playersData: data,
        playerName,
        percentile,
      });
      return playerData;
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
