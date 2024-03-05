import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import { fetchAllLeavePoliciesApiResponse } from "@/_utils/types/leave-policy";
import {
  editLeavePolicySchema,
  leavePolicySchema,
} from "@/components/modules/policies/leave-policy";

const LeavePolicyService = () => {
  const useFetchAllLeavePolicies = (page: number, query: string) => {
    function fetchAllDesignations(): Promise<fetchAllLeavePoliciesApiResponse> {
      return axios
        .get(`/leave-policy/all?status=${query}&page=${page ?? 1}&limit=100`)
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllDesignations,
      queryKey: [`leave-policy`, query],
      retry: 0,
    });
  };
  const useHandleCreateLeavePolicy = () => {
    const queryClient = useQueryClient();
    function handleCreateLeavePolicy(
      data: z.infer<typeof leavePolicySchema>,
    ): Promise<loginApiResponse> {
      return axios.post("/leave-policy", data).then((res) => res.data);
    }
    const onSuccess = async () => {
      toast.success("Leave Policy Created Successfully");
      await queryClient.invalidateQueries({ queryKey: ["leave-policy"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateLeavePolicy,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleDeleteLeavePolicy = () => {
    const queryClient = useQueryClient();
    function handleDeleteLeavePolicy(id: string): Promise<loginApiResponse> {
      return axios.delete(`/leave-policy/single/${id}`).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Leave Policy Deleted Successfully");
      await queryClient.invalidateQueries({ queryKey: ["leave-policy"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleDeleteLeavePolicy,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleUpdateLeavePolicy = () => {
    const queryClient = useQueryClient();
    function handleCreateDesignation(
      data: z.infer<typeof editLeavePolicySchema>,
    ): Promise<loginApiResponse> {
      return axios
        .put(`/leave-policy/${data.id}`, data)
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Leave Policy Updated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["leave-policy"] });
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
    useFetchAllLeavePolicies,
    useHandleCreateLeavePolicy,
    useHandleDeleteLeavePolicy,
    useHandleUpdateLeavePolicy,
  };
};
export default LeavePolicyService;
