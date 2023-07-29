import { useQuery } from "react-query";
import { teamPassingNetworkData } from "../firestore/getTeamStats";

export const fetchPassingNetworkData = (...args) => {
    return useQuery(['passingNetworkData', ...args], () => teamPassingNetworkData(args))
}