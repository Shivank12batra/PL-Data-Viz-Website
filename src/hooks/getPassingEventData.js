import { useQuery } from "react-query";
import { teamPlayerPassingData } from "../firestore/getTeamStats";

export const fetchPassingEventData = (...args) => {
  return useQuery(
    ["passingEventData", ...args],
    () => teamPlayerPassingData(args),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
};
