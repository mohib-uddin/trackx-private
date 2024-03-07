import { useQuery } from "@tanstack/react-query";

import axios from "@/_utils/config/axios-instance";
import { employeeHierarchyType } from "@/_utils/types/heirarchy";

const HierarchyService = () => {
  const useFetchEmployeeHierarchy = () => {
    function fetchHierarchy(): Promise<employeeHierarchyType> {
      let url = `/hierarchy`;
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchHierarchy,
      queryKey: [`hierarchy`],
      retry: 0,
    });
  };

  return {
    useFetchEmployeeHierarchy,
  };
};
export default HierarchyService;
