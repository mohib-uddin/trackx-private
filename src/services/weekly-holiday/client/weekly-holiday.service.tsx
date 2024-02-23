import { useQuery } from "@tanstack/react-query";

import axios from "@/_utils/config/axios-instance";
import { fetchWeeklyHolidayApiResponse } from "@/_utils/types/weekly-holiday";

const WeeklyHolidayService = () => {
  const useFetchAllWeeklyHolidays = (query: string) => {
    function fetchAllHolidays(): Promise<fetchWeeklyHolidayApiResponse> {
      return axios
        .get(`/weekly-holiday/all?page=1&limit=100&query=${query}`)
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllHolidays,
      queryKey: [`weekly-holiday`, query],
      retry: 0,
    });
  };

  return {
    useFetchAllWeeklyHolidays,
  };
};
export default WeeklyHolidayService;
