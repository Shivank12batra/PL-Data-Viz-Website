import { useQuery } from "react-query";
import { teamPlayerPassingData } from "../firestore/getTeamStats";

export const fetchPassingEventData = (...args) => {
    return useQuery(['passingEventData', ...args], () => teamPlayerPassingData(args), {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    })
}