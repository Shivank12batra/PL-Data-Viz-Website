import { useQuery } from "react-query";
import { teamPassingNetworkData } from "../firestore/getTeamStats";

export const fetchPassingNetworkData = (...args) => {
    console.log(args)
    return useQuery(['passingNetworkData', ...args], () => teamPassingNetworkData(args), {
        cacheTime: 2000,
    })
}