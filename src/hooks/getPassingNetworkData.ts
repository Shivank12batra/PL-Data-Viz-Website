import { useQuery } from "react-query";
import {
  ITeamPassingNetworkDataProps,
  teamPassingNetworkData,
} from "../firestore/getTeamStats";

export const fetchPassingNetworkData = ({
  ...args
}: ITeamPassingNetworkDataProps) => {
  return useQuery(
    ["passingNetworkData", { ...args }],
    () => teamPassingNetworkData(args),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
};
