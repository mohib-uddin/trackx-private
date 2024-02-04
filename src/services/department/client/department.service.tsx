import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import { fetchAllDepartmentsApiResponse } from "@/_utils/types/department";

const DepartmentService = () => {
  const useFetchAllDepartments = (
    query: string,
    page: number,
    status: boolean,
  ) => {
    function fetchAllDepartments(): Promise<fetchAllDepartmentsApiResponse> {
      let url = `/department?page=${page}&limit=10&status=${status}`;
      if (query != "") {
        url += `&query=${query}`;
      }
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllDepartments,
      queryKey: [`department`, query, page, status],
      retry: 0,
    });
  };
  const useHandleCreateDepartment = () => {
    const queryClient = useQueryClient();
    function handleCreateDesignation(data: {
      name: string;
    }): Promise<loginApiResponse> {
      return axios.post("/department", data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Department Created Successfully");
      await queryClient.invalidateQueries({ queryKey: ["department"] });
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
  const useHandleDeleteDepartment = () => {
    const queryClient = useQueryClient();
    function handleDeleteDesignation(id: string): Promise<loginApiResponse> {
      return axios.patch(`/department/${id}`).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Department Deleted Successfully");
      await queryClient.invalidateQueries({ queryKey: ["department"] });
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

  const useHandleUpdateDepartment = () => {
    const queryClient = useQueryClient();
    function handleUpdateDepartment(data: {
      name: string;
      id: string;
    }): Promise<loginApiResponse> {
      return axios
        .put(`/department/${data.id}`, { name: data.name })
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Department Updated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["department"] });
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
    useFetchAllDepartments,
    useHandleCreateDepartment,
    useHandleDeleteDepartment,
    useHandleUpdateDepartment,
  };
};
export default DepartmentService;
