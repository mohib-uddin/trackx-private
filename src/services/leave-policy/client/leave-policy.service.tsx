import { useQuery } from "@tanstack/react-query";

import axios from "@/_utils/config/axios-instance";
import { fetchAllLeavePoliciesApiResponse } from "@/_utils/types/leave-policy";

const LeavePolicyService = () => {
  const useFetchAllLeavePolicies = (query: string) => {
    function fetchAllDesignations(): Promise<fetchAllLeavePoliciesApiResponse> {
      return axios
        .get(`/leave-policy/all?status=${query}&page=1&limit=100`)
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllDesignations,
      queryKey: [`leave-policy`, query],
      retry: 0,
    });
  };

  return {
    useFetchAllLeavePolicies,
  };
};
export default LeavePolicyService;
