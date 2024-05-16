import { TTeam, TTopSixTeam } from "../types";

export const alterTeamName = (teamName: TTeam) => {
  if (teamName === "Manchester City") return "Man City";
  if (teamName === "Manchester United") return "Man Utd";
  return teamName;
};

export const teamColorMapping: Record<TTopSixTeam, Record<string, string>> = {
  Arsenal: { color: "red", oppositionColor: "blue" },
  Liverpool: { color: "red", oppositionColor: "blue" },
  "Manchester United": { color: "red", oppositionColor: "blue" },
  Tottenham: { color: "white", oppositionColor: "blue" },
  Chelsea: { color: "blue", oppositionColor: "red" },
  "Manchester City": { color: "#1E90FF", oppositionColor: "red" },
};
