import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import { fetchAllDesignationApiResponse } from "@/_utils/types/designation";

const DesignationService = () => {
  const useFetchAllDesignations = (
    page: number,
    query: string,
    status: boolean,
  ) => {
    function fetchAllDesignations(): Promise<fetchAllDesignationApiResponse> {
      let url = `/designation?status=${status}&page=${page}&limit=10`;
      if (query != "") {
        url += `&query=${query}`;
      }
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllDesignations,
      queryKey: [`designation`, status, page, query],
      retry: 0,
    });
  };
  const useHandleCreateDesignation = () => {
    const queryClient = useQueryClient();
    function handleCreateDesignation(data: {
      name: string;
    }): Promise<loginApiResponse> {
      return axios.post("/designation", data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Designation Created Successfully");
      await queryClient.invalidateQueries({ queryKey: ["designation"] });
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

  const useHandleDeleteDesignation = () => {
    const queryClient = useQueryClient();
    function handleDeleteDesignation(id: string): Promise<loginApiResponse> {
      return axios.delete(`/designation/${id}`).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Designation Deleted Successfully");
      await queryClient.invalidateQueries({ queryKey: ["designation"] });
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

  const useHandleUpdateDesignation = () => {
    const queryClient = useQueryClient();
    function handleCreateDesignation(data: {
      name: string;
      reportsTo: number;
      id: string;
    }): Promise<loginApiResponse> {
      return axios
        .put(`/designation/${data.id}`, {
          name: data.name,
          reportsTo: data.reportsTo,
        })
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Designation Updated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["designation"] });
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
    useFetchAllDesignations,
    useHandleCreateDesignation,
    useHandleDeleteDesignation,
    useHandleUpdateDesignation,
  };
};
export default DesignationService;
