import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import {
  createAssetType,
  createAssetTypeType,
  fetchAllAllocatedAssetsApiResponse,
  fetchAllAssetApiResponse,
  fetchAllAssetTypeApiResponse,
} from "@/_utils/types/assets";
import { fetchAllEmployeeApiResponse } from "@/_utils/types/employees";
import {
  assetSchema,
  editAssetSchema,
} from "@/components/modules/hr/assets/all-assets";
import {
  assetAllocationSchema,
  editAssetAllocationSchema,
} from "@/components/modules/hr/assets/allocated-assets";

const AssetsService = () => {
  const useFetchAllAssetsTypes = (page: number) => {
    function fetchAllAssetTypes(): Promise<fetchAllAssetTypeApiResponse> {
      let url = `/asset-type/all?&page=${page}&limit=10`;
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllAssetTypes,
      queryKey: [`asset-type`, page],
      retry: 0,
    });
  };
  const useHandleCreateAssetType = () => {
    const queryClient = useQueryClient();
    function handleCreateDesignation(
      data: createAssetTypeType,
    ): Promise<loginApiResponse> {
      return axios.post("/asset-type", data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Asset Type Created Successfully");
      await queryClient.invalidateQueries({ queryKey: ["asset-type"] });
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

  const useHandleDeleteAssetType = () => {
    const queryClient = useQueryClient();
    function handleDeleteDesignation(id: string): Promise<loginApiResponse> {
      return axios.delete(`/asset-type/${id}`).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Asset Type Deleted Successfully");
      await queryClient.invalidateQueries({ queryKey: ["asset-type"] });
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

  const useHandleUpdateAssetTypes = () => {
    const queryClient = useQueryClient();
    function handleUpdateAssetTypes(data: {
      name: string;
      description: string;
      id: string;
    }): Promise<loginApiResponse> {
      return axios
        .put(`/asset-type/${data.id}`, {
          name: data.name,
          description: data.description,
        })
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Asset Type Updated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["asset-type"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleUpdateAssetTypes,
      onError,
      onSuccess,
      retry: 0,
    });
  };

  const useFetchAllAssets = (page: number) => {
    function fetchAllAssetTypes(): Promise<fetchAllAssetApiResponse> {
      let url = `/asset/all?&page=${page}&limit=10`;
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllAssetTypes,
      queryKey: [`asset`, page],
      retry: 0,
    });
  };
  const useHandleCreateAsset = () => {
    const queryClient = useQueryClient();
    function handleCreateDesignation(
      data: createAssetType,
    ): Promise<loginApiResponse> {
      return axios.post("/asset", data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Asset Created Successfully");
      await queryClient.invalidateQueries({ queryKey: ["asset"] });
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

  const useHandleDeleteAsset = () => {
    const queryClient = useQueryClient();
    function handleDeleteDesignation(id: string): Promise<loginApiResponse> {
      return axios.delete(`/asset/${id}`).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Asset Deleted Successfully");
      await queryClient.invalidateQueries({ queryKey: ["asset"] });
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

  const useHandleUpdateAsset = () => {
    const queryClient = useQueryClient();
    function handleUpdateAssetTypes(
      data: z.infer<typeof editAssetSchema>,
    ): Promise<loginApiResponse> {
      return axios.put(`/asset/${data.id}`, data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Asset Updated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["asset"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleUpdateAssetTypes,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useFetchAlLAllocatedAssets = (page: number) => {
    function fetchAllAssetTypes(): Promise<fetchAllAllocatedAssetsApiResponse> {
      let url = `/allocated-asset/all?&page=${page}&limit=10`;
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllAssetTypes,
      queryKey: [`allocated-asset`, page],
      retry: 0,
    });
  };
  const useFetchInfiniteAssets = () => {
    function fetchAllEmployees(
      pageParam = 1,
    ): Promise<fetchAllAssetApiResponse> {
      let url = `/asset/all?&page=${pageParam}&limit=10`;
      return axios.get(url).then((res) => res.data);
    }

    return useInfiniteQuery({
      queryFn: ({ pageParam = 1 }) => fetchAllEmployees(pageParam),
      queryKey: [`asset`],
      retry: 0,
      initialPageParam: 1,
      getNextPageParam: (page) =>
        page.page === page.lastPage ? undefined : page.page + 1,
    });
  };
  const useHandleAllocateAsset = () => {
    const queryClient = useQueryClient();
    function handleUpdateAssetTypes(
      data: z.infer<typeof assetAllocationSchema>,
    ): Promise<fetchAllAllocatedAssetsApiResponse> {
      return axios.post(`/allocated-asset`, data).then((res) => res.data);
    }
    const onSuccess = async () => {
      toast.success("Asset Allocated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["allocated-asset"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleUpdateAssetTypes,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleUpdateAssetAllocation = () => {
    const queryClient = useQueryClient();
    function handleUpdateAssetTypes(
      data: z.infer<typeof editAssetAllocationSchema>,
    ): Promise<loginApiResponse> {
      return axios
        .put(`/allocated-asset/${data.id}`, data)
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Asset Allocation Updated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["allocated-asset"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleUpdateAssetTypes,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  return {
    useFetchAllAssetsTypes,
    useHandleCreateAssetType,
    useHandleDeleteAssetType,
    useHandleAllocateAsset,
    useHandleUpdateAssetTypes,
    useFetchAllAssets,
    useHandleUpdateAssetAllocation,
    useFetchAlLAllocatedAssets,
    useHandleDeleteAsset,
    useHandleCreateAsset,
    useHandleUpdateAsset,
    useFetchInfiniteAssets,
  };
};
export default AssetsService;
