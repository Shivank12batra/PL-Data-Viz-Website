import { ICumulativeXG, TShotData, TTeam, TTeamIndicator } from "../types";

interface IFilterShotsDataProps {
  shotsData: TShotData[] | undefined;
  homeTeam: string;
  awayTeam: string;
}

interface ICalculateCumulativeXGProps {
  shots: TShotData[] | undefined;
  teamIndicator: TTeamIndicator;
}

interface IFilterDataForShotMapProps {
  shots: TShotData[] | undefined;
  team: TTeam;
  homeTeam: string;
  awayTeam: string;
  playerName: string;
}

export const filterShotsData = ({
  shotsData,
  homeTeam,
  awayTeam,
}: IFilterShotsDataProps) => {
  if (shotsData === undefined) return;

  return shotsData.filter(
    (shot) => shot.h_team === homeTeam && shot.a_team === awayTeam
  );
};

export const calculateCumulativeXG = ({
  shots,
  teamIndicator,
}: ICalculateCumulativeXGProps) => {
  if (shots === undefined) return;

  const filteredShots = shots.filter((shot) => shot.h_a === teamIndicator);
  const sortedShots = filteredShots.sort(
    (a, b) => parseInt(a.minute) - parseInt(b.minute)
  );

  let cumulativeXG = 0;
  const teamArray: ICumulativeXG[] = sortedShots.reduce(
    (acc: ICumulativeXG[], shot) => {
      cumulativeXG += parseFloat(shot.xG);
      acc.push({
        minute: shot.minute,
        xG: shot.xG,
        cumulativeXG,
        player: shot.player,
        result: shot.result,
        shotType: shot.shotType,
        situation: shot.situation,
      });
      return acc;
    },
    []
  );

  teamArray.unshift({
    minute: "0",
    xG: "0",
    cumulativeXG: 0,
    player: null,
    result: null,
    shotType: null,
    situation: null,
  });

  if (
    teamArray.length > 0 &&
    parseInt(teamArray[teamArray.length - 1].minute) < 90
  ) {
    const lastCumulativeXG = teamArray[teamArray.length - 1].cumulativeXG;
    teamArray.push({
      minute: "90",
      xG: "0.001",
      cumulativeXG: lastCumulativeXG + 0.001,
      player: null,
      result: null,
      shotType: null,
      situation: null,
    });
  }

  return teamArray;
};

export const filterDataForShotMap = ({
  shots,
  team,
  homeTeam,
  awayTeam,
  playerName,
}: IFilterDataForShotMapProps) => {
  const matchFilteredShots = filterShotsData({
    shotsData: shots,
    homeTeam,
    awayTeam,
  });
  if (matchFilteredShots === undefined || matchFilteredShots.length === 0)
    return undefined;
  const userTeamVenue = team === homeTeam ? "h" : "a";
  const teamFilteredShots = matchFilteredShots.filter(
    (shot) => shot.h_a === userTeamVenue
  );

  if (playerName) {
    const playerFilteredShots = teamFilteredShots.filter(
      (shot) => shot.player === playerName
    );
    return playerFilteredShots;
  }

  return teamFilteredShots;
};
