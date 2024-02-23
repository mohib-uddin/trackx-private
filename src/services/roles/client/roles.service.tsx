import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import { revalidateServer } from "@/_utils/actions";
import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import { fetchAllRolesApiResponse } from "@/_utils/types/role";
import { editRolesSchema, rolesSchema } from "@/components/modules/roles";

const RolesService = () => {
  const useFetchAllRoles = (query: string, page: number) => {
    function fetchAllRoles(): Promise<fetchAllRolesApiResponse> {
      return axios
        .get(`/role/all?page=${page ?? 1}&limit=100&query=${query}`)
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllRoles,
      queryKey: [`role`, query],
      retry: 0,
    });
  };
  const useHandleCreateRole = () => {
    const queryClient = useQueryClient();
    function handleCreateRole(
      data: z.infer<typeof rolesSchema>,
    ): Promise<loginApiResponse> {
      return axios.post("/role", data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Role Created Successfully");
      await queryClient.invalidateQueries({ queryKey: ["role"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateRole,
      onError,
      onSuccess,
      retry: 0,
    });
  };

  const useHandleDeleteRole = () => {
    const queryClient = useQueryClient();
    function handleDeleteDesignation(id: string): Promise<loginApiResponse> {
      return axios.delete(`/role/single/${id}`).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Role Deleted Successfully");
      await queryClient.invalidateQueries({ queryKey: ["role"] });
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

  const useHandleUpdateRole = () => {
    const queryClient = useQueryClient();
    function handleUpdateRole(
      data: z.infer<typeof editRolesSchema>,
    ): Promise<loginApiResponse> {
      return axios
        .put(`/role/${data.id}`, { name: data.name })
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Role Updated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["role"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleUpdateRole,
      onError,
      onSuccess,
      retry: 0,
    });
  };

  const useHandleUpdateRolePermissions = () => {
    function handleUpdateRole(data: {
      permission_id: number[];
      role_id: number;
    }): Promise<loginApiResponse> {
      return axios.post(`/role-permission`, data).then((res) => res.data);
    }
    const onSuccess = () => {
      toast.success("Permissions Updated Successfully");
      revalidateServer("permissions-by-role");
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleUpdateRole,
      onError,
      onSuccess,
      retry: 0,
    });
  };

  return {
    useFetchAllRoles,
    useHandleUpdateRole,
    useHandleCreateRole,
    useHandleDeleteRole,
    useHandleUpdateRolePermissions,
  };
};
export default RolesService;
