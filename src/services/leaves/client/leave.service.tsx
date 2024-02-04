import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import { fetchAllLeaveApiResponse } from "@/_utils/types/leave";
import TokenService from "@/services/token/token.service";

const LeaveManagementService = () => {
  const useFetchAllLeaves = (status: string, page: number, limit: number) => {
    function fetchAllDesignations(): Promise<fetchAllLeaveApiResponse> {
      let url = `/leave-application/all/?page=${page}&limit=${limit}`;
      if (status != "all") {
        url += `&status=${status}`;
      }
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllDesignations,
      queryKey: [`leave`, status, page],
      retry: 0,
    });
  };
  const useHandleUpdateLeave = () => {
    const queryClient = useQueryClient();
    function handleCreateDesignation(data: {
      acceptLeaveFrom: string;
      acceptLeaveTo: string;
      reviewComment: string;
      status: string;
      id: string;
    }): Promise<loginApiResponse> {
      return axios
        .put(`/leave-application/${data.id}`, data)
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Leave Status Updated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["leave"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateDesignation,
      onError,
      onSuccess,
      retry: 0,
    });
  };

  const useHandleCreateLeave = () => {
    const queryClient = useQueryClient();
    const token = TokenService.getUser();
    function handleCreateDesignation(data: {
      leaveFrom: string;
      leaveTo: string;
      leaveType: string;
      reason: string;
    }): Promise<loginApiResponse> {
      return axios
        .post(`/leave-application`, { ...data, userId: token?.id })
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Leave Submitted Successfully");
      await queryClient.invalidateQueries({ queryKey: ["leave"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateDesignation,
      onError,
      onSuccess,
      retry: 0,
    });
  };

  return {
    useFetchAllLeaves,
    useHandleUpdateLeave,
    useHandleCreateLeave,
  };
};
export default LeaveManagementService;
