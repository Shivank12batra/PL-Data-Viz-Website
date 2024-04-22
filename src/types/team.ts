export type TTeam =
  | "Arsenal"
  | "Manchester City"
  | "Manchester United"
  | "Tottenham"
  | "Newcastle"
  | "Newcastle United"
  | "Liverpool"
  | "Brighton"
  | "Brentford"
  | "Fulham"
  | "Chelsea"
  | "Aston Villa"
  | "Crystal Palace"
  | "Wolves"
  | "Leeds"
  | "Everton"
  | "Nottingham Forest"
  | "Leicester"
  | "West Ham"
  | "Bournemouth"
  | "Southampton";

export type TTopSixTeam = Extract<
  TTeam,
  | "Arsenal"
  | "Manchester City"
  | "Manchester United"
  | "Tottenham"
  | "Liverpool"
  | "Chelsea"
>;

export type TTeamIndicator = "h" | "a";

export type TVenue = "Home" | "Away";

// TODO: can narrow the types even more for some of these attributes
export type TShotData = {
  id: string;
  X: string;
  Y: string;
  a_goals: number;
  a_team: TTeam;
  h_team: TTeam;
  date: string;
  h_a: TTeamIndicator;
  h_goals: string;
  lastAction: string;
  match_id: string;
  minute: string;
  season: string;
  player_id: string;
  player: string | null;
  result: string | null;
  shotType: string | null;
  situation: string | null;
  xG: string;
};

export interface ICumulativeXG
  extends Pick<
    TShotData,
    "minute" | "xG" | "player" | "result" | "shotType" | "situation"
  > {
  cumulativeXG: number;
}

export interface IAverageLocation {
  count: number;
  name: string;
  passer: number;
  shirtNo: number;
  x: number;
  y: number;
}

export interface IPassBetween {
  count: number;
  count_end: number;
  pass_count: number;
  passer: number;
  recipient: number;
  x: number;
  x_end: number;
  y: number;
  y_end: number;
}

export interface IPassingNetworkData {
  average_locations: IAverageLocation[];
  pass_between: IPassBetween[];
}

export interface IPassingData {
  away_team: string;
  endX: number;
  endY: number;
  eventId: number;
  home_team: string;
  id: number;
  index: number;
  isTouch: boolean;
  match_id: number;
  minute: number;
  name: string;
  outcomeType_displayName: string;
  outcomeType_value: number;
  playerId: number;
  position: string;
  shirtNo: number;
  teamId: number;
  type_displayName: string;
  type_value: number;
  x: number;
  y: number;
}

export interface TTeamTable {
  Rank: number;
  Squad: TTeam;
  MP: number;
  W: number;
  D: number;
  L: number;
  Pts: number;
  xG: number;
  xGA: number;
  xGD: number;
  Form: string;
}
