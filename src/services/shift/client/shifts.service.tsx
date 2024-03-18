import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import { fetchAllShiftsApiResponse } from "@/_utils/types/shift";
import {
  editShiftSchema,
  shiftSchema,
} from "@/components/modules/policies/shifts";

const ShiftService = () => {
  const useFetchAllShifts = (status: string, page = 1) => {
    function fetchAllShifts(): Promise<fetchAllShiftsApiResponse> {
      return axios
        .get(`/shift/all?status=${status}&page=${page}&limit=100`)
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllShifts,
      queryKey: [`shift`, status],
      retry: 0,
    });
  };
  const useHandleCreateShift = () => {
    const queryClient = useQueryClient();
    function handleCreateShift(
      data: z.infer<typeof shiftSchema>,
    ): Promise<any> {
      return axios.post("/shift", data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Shift Created Successfully");
      await queryClient.invalidateQueries({ queryKey: ["shift"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateShift,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleDeleteShift = () => {
    const queryClient = useQueryClient();
    function handleDeleteDesignation(id: string): Promise<loginApiResponse> {
      return axios.delete(`/shift/single/${id}`).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Shift Deleted Successfully");
      await queryClient.invalidateQueries({ queryKey: ["shift"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleDeleteDesignation,
      onError,
      onSuccess,
      retry: 0,
    });
  };

  const useHandleUpdateShift = () => {
    const queryClient = useQueryClient();
    function handleCreateDesignation(
      data: z.infer<typeof editShiftSchema>,
    ): Promise<any> {
      return axios.put(`/shift/${data.id}`, data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Shift Updated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["shift"] });
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
    useFetchAllShifts,
    useHandleCreateShift,
    useHandleDeleteShift,
    useHandleUpdateShift,
  };
};
export default ShiftService;
