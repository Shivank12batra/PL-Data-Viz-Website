import { pitch } from "d3-soccer";

// TODO: provide proper types for pitch config
export const pitchConfig = pitch()
  .height(500)
  .clip([
    [0, 0],
    [68, 105],
  ])
  .goals("line")
  .rotate(true)
  .showDirOfPlay(true)
  .shadeMiddleThird(false);
