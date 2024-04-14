import { IPlayerData, TPlayerStat } from "../types";

interface IFilterByStatProps {
  playersData: IPlayerData[] | undefined;
  stat: TPlayerStat;
}

interface ICompareStatsProps {
  statA: string;
  statB: string;
}

interface IFilterByPlayerNameAndStatTypeProps {
  playersData: IPlayerData[] | undefined;
  playerName: string;
  percentile: boolean;
}

export const filterByStat = ({ playersData, stat }: IFilterByStatProps) => {
  if (playersData === undefined) return;

  const filterPlayersData = playersData.filter(
    (player) => player["Per 90"][stat] && player["minutes"] > 500
  );
  const sortedPlayersData = filterPlayersData.sort((a, b) =>
    compareStats({ statA: a["Per 90"][stat], statB: b["Per 90"][stat] })
  );
  // filtering and removing percentile key which is not needed
  const finalSortedData = sortedPlayersData.map(
    ({ Percentile, ...rest }) => rest
  );
  return finalSortedData;
};

// Custom comparison function to handle percentage values
const compareStats = ({ statA, statB }: ICompareStatsProps) => {
  const percentageRegex = /^(\d+(\.\d+)?)%$/;

  const isPercentage = (value: string) => percentageRegex.test(value);

  const parsePercentage = (value: string) => parseFloat(value.replace("%", ""));

  if (isPercentage(statA) && isPercentage(statB)) {
    const parsedA = parsePercentage(statA);
    const parsedB = parsePercentage(statB);
    return parsedB - parsedA; // Sorting in descending order
  } else {
    return Number(statB) - Number(statA); // Default numeric sorting
  }
};

export const filterByPlayerNameAndStatType = ({
  playersData,
  playerName,
  percentile,
}: IFilterByPlayerNameAndStatTypeProps) => {
  const typeOfStat = percentile ? "Percentile" : "Per 90";
  const playerData = playersData
    ?.filter((player) => player.name === playerName)
    .map((player) => player[`${typeOfStat}`])[0];
  return playerData;
};
