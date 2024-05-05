// Define types for individual stat categories
export type TDefendingStat = "Aerials won" | "Tackles" | "Interceptions";

export type TPassingStat =
  | "Pass Completion %"
  | "Progressive Passes"
  | "Shot-Creating Actions";

export type TAttackingStat =
  | "Progressive Carries"
  | "Successful Take-Ons"
  | "Non-Penalty xG";

export type TGKShotStoppingStat =
  | "Save Percentage"
  | "PSxG-GA"
  | "Crosses Stopped %";

export type TGKPassingStat = "Touches" | "Launch %";

export type TGKSweepingStat = "Def. Actions Outside Pen. Area";

// Combine individual stat types into a grand player stat type
export type TPlayerStat =
  | TDefendingStat
  | TPassingStat
  | TAttackingStat
  | TGKShotStoppingStat
  | TGKPassingStat
  | TGKSweepingStat;

export interface IPlayerData {
  "Per 90": Record<TPlayerStat, string>;
  Percentile: Record<TPlayerStat, number>;
  image_url: string;
  name: string;
  age: number;
  minutes: number;
  position: string;
}
