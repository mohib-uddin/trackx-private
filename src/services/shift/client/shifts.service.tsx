import { useQuery } from "@tanstack/react-query";

import axios from "@/_utils/config/axios-instance";
import { fetchAllShiftsApiResponse } from "@/_utils/types/shift";

const ShiftService = () => {
  const useFetchAllShifts = (status: string) => {
    function fetchAllShifts(): Promise<fetchAllShiftsApiResponse> {
      return axios.get(`/shift?status=${status}`).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllShifts,
      queryKey: [`shifts`, status],
      retry: 0,
    });
  };

  return {
    useFetchAllShifts,
  };
};
export default ShiftService;
