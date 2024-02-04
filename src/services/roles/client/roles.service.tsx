import { useQuery } from "@tanstack/react-query";

import axios from "@/_utils/config/axios-instance";
import { fetchAllRolesApiResponse } from "@/_utils/types/role";

const RolesService = () => {
  const useFetchAllRoles = (query: string) => {
    function fetchAllRoles(): Promise<fetchAllRolesApiResponse> {
      return axios.get(`/role?query=${query}`).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllRoles,
      queryKey: [`role`, query],
      retry: 0,
    });
  };

  return {
    useFetchAllRoles,
  };
};
export default RolesService;
