import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import { fetchAllBankAccountsApiResponse } from "@/_utils/types/bank";
import {
  bankDetailsSchema,
  editBankDetailsSchema,
} from "@/components/modules/hr/employee/employee-profile/employee-banks-section";

const BankService = () => {
  const useFetchAllBankAccounts = (type: string, page: number) => {
    function fetchAllDepartments(): Promise<fetchAllBankAccountsApiResponse> {
      let url = `/bank/all?page=${page}&limit=10&type=${type}`;
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllDepartments,
      queryKey: [`bank`, type, page],
      retry: 0,
    });
  };
  const useHandleAddBankDetails = () => {
    const queryClient = useQueryClient();
    function handleCreateDesignation(
      data: z.infer<typeof bankDetailsSchema>,
    ): Promise<loginApiResponse> {
      return axios.post("/bank", data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Bank Added  Successfully");
      await queryClient.invalidateQueries({ queryKey: ["bank"] });
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
  const useHandleDeleteBankDetails = () => {
    const queryClient = useQueryClient();
    function handleDeleteDesignation(id: string): Promise<loginApiResponse> {
      return axios.patch(`/bank/${id}`).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Bank Details Deleted Successfully");
      await queryClient.invalidateQueries({ queryKey: ["bank"] });
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

  const useHandleUpdateBankDetails = () => {
    const queryClient = useQueryClient();
    function handleUpdateDepartment(
      data: z.infer<typeof editBankDetailsSchema>,
    ): Promise<loginApiResponse> {
      return axios.put(`/bank/${data.id}`, data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Bank Details Updated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["bank"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleUpdateDepartment,
      onError,
      onSuccess,
      retry: 0,
    });
  };

  return {
    useFetchAllBankAccounts,
    useHandleAddBankDetails,
    useHandleDeleteBankDetails,
    useHandleUpdateBankDetails,
  };
};
export default BankService;
