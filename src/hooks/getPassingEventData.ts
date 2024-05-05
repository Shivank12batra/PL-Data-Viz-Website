import { useQuery } from "react-query";
import {
  ITeamPlayerPassingDataProps,
  teamPlayerPassingData,
} from "../firestore/getTeamStats";

export const fetchPassingEventData = ({
  ...args
}: ITeamPlayerPassingDataProps) => {
  return useQuery(
    ["passingEventData", { ...args }],
    () => teamPlayerPassingData(args),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
};
