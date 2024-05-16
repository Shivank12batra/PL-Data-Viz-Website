import {
  TAttackingStat,
  TDefendingStat,
  TGKPassingStat,
  TGKShotStoppingStat,
  TGKSweepingStat,
  TPassingStat,
} from "../types";

export const defending: TDefendingStat[] = [
  "Aerials won",
  "Tackles",
  "Interceptions",
];

export const passing: TPassingStat[] = [
  "Pass Completion %",
  "Progressive Passes",
  "Shot-Creating Actions",
];

export const attacking: TAttackingStat[] = [
  "Progressive Carries",
  "Successful Take-Ons",
  "Non-Penalty xG",
];

export const gkShotStopping: TGKShotStoppingStat[] = [
  "Save Percentage",
  "PSxG-GA",
  "Crosses Stopped %",
];

export const gkPassing: TGKPassingStat[] = ["Touches", "Launch %"];

export const gkSweeping: TGKSweepingStat[] = ["Def. Actions Outside Pen. Area"];
