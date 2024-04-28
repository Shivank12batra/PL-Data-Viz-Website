import { useQuery } from "react-query";
import { teamShotsData } from "../firestore/getTeamStats";
import {
  filterShotsData,
  calculateCumulativeXG,
  filterDataForShotMap,
} from "../utils/shotsDataUtils";
import { TTeam, TTopSixTeam } from "../types";

interface IFetchCumulativeXGChartData {
  team: TTopSixTeam;
  homeTeam: TTeam;
  awayTeam: TTeam;
}

interface IFetchShotMapData extends IFetchCumulativeXGChartData {
  playerName?: string;
}

export const fetchCumulativeXGChartData = ({
  team,
  homeTeam,
  awayTeam,
}: IFetchCumulativeXGChartData) => {
  return useQuery(["cumulativeXGChart", team], () => teamShotsData(team), {
    select: (data) => {
      const filteredData = filterShotsData({
        shotsData: data,
        homeTeam,
        awayTeam,
      });
      const homeData = calculateCumulativeXG({
        shots: filteredData !== undefined ? [...filteredData] : undefined,
        teamIndicator: "h",
      });
      const awayData = calculateCumulativeXG({
        shots: filteredData !== undefined ? [...filteredData] : undefined,
        teamIndicator: "a",
      });
      return { homeData, awayData };
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const fetchShotMapData = ({
  team,
  homeTeam,
  awayTeam,
  playerName = "",
}: IFetchShotMapData) => {
  return useQuery(["shotMap", team], () => teamShotsData(team), {
    select: (data) => {
      const filteredData = filterDataForShotMap({
        shots: data,
        team,
        homeTeam,
        awayTeam,
        playerName,
      });
      return filteredData;
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
