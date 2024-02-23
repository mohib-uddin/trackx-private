import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import { checkInStatusType, clockInType } from "@/_utils/types/attendance";
import { fetchAllDepartmentsApiResponse } from "@/_utils/types/department";

const AttendanceService = () => {
  const useFetchLastAttendance = (id: string | undefined) => {
    async function fetchLastAttendance(): Promise<checkInStatusType> {
      let url = `/attendance/${id}/last`;
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchLastAttendance,
      enabled: !!id,
      queryKey: [`last-attendance`, id],
      retry: 0,
    });
  };

  const useHandleClockInService = () => {
    const queryClient = useQueryClient();
    function handleClockIn(data: clockInType): Promise<loginApiResponse> {
      return axios
        .post("/attendance/mark-in-time", data)
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Checked In Successfully");
      await queryClient.invalidateQueries({ queryKey: ["last-attendance"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleClockIn,
      onError,
      onSuccess,
      retry: 0,
    });
  };

  const useHandleClockOutService = () => {
    const queryClient = useQueryClient();
    function handleClockOut(data: clockInType): Promise<loginApiResponse> {
      return axios
        .put("/attendance/mark-out-time", data)
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Checked Out Successfully");
      await queryClient.invalidateQueries({ queryKey: ["last-attendance"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleClockOut,
      onError,
      onSuccess,
      retry: 0,
    });
  };

  return {
    useFetchLastAttendance,
    useHandleClockInService,
    useHandleClockOutService,
  };
};
export default AttendanceService;
