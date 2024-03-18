import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { revalidateServer } from "@/_utils/actions";
import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import {
  employeeType,
  fetchAllEmployeeApiResponse,
  fetchAllEmploymentStatusApiResponse,
} from "@/_utils/types/employees";
import { designationFormSchema } from "@/components/modules/hr/employee/employee-profile/designation-section";
import { educationFormSchema } from "@/components/modules/hr/employee/employee-profile/employee-skills-section";
import { employmentStatusSchema } from "@/components/modules/hr/employment-status";
import tokenService from "@/services/token/token.service";

const EmployeeService = () => {
  const useFetchAllEmployees = (
    status: boolean,
    page: number,
    limit: number,
    searchQuery: string,
  ) => {
    console.log(searchQuery, "sq");
    function fetchAllEmployeeRequest(): Promise<fetchAllEmployeeApiResponse> {
      let url = `/user/get-all?status=${status}&page=${page}&limit=${limit}`;
      if (searchQuery != "") {
        url += `&query=${searchQuery}`;
      }
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllEmployeeRequest,
      queryKey: [`all-employees`, page, searchQuery],
      retry: 0,
    });
  };
  const useFetchInfiniteEmployees = (status: boolean, searchQuery: string) => {
    function fetchAllEmployees(
      pageParam = 1,
    ): Promise<fetchAllEmployeeApiResponse> {
      let url = `/user/get-all?status=${status}&page=${pageParam}&limit=50`;
      if (searchQuery != "") {
        url += `&query=${searchQuery}`;
      }
      return axios.get(url).then((res) => res.data);
    }

    return useInfiniteQuery({
      queryFn: ({ pageParam = 1 }) => fetchAllEmployees(pageParam),
      queryKey: [`all-employees`, searchQuery],
      retry: 0,
      initialPageParam: 1,
      getNextPageParam: (page) =>
        page.page === page.lastPage ? undefined : page.page + 1,
    });
  };
  const useFetchAllEmploymentStatus = (status: boolean, page?: number) => {
    function fetchAllEmployeeRequest(): Promise<fetchAllEmploymentStatusApiResponse> {
      return axios
        .get(
          `/employment-status/all?status=${status}&page=${page ?? 1}&limit=${page ? 10 : 100}`,
        )
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllEmployeeRequest,
      queryKey: [`all-employees-status`, status],
      retry: 0,
    });
  };
  const useHandleCreateEmploymentStatus = () => {
    const queryClient = useQueryClient();
    function handleCreateEmployee(
      data: z.infer<typeof employmentStatusSchema>,
    ): Promise<loginApiResponse> {
      return axios.post("/employment-status", data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Employment Status Created Successfully");
      await queryClient.invalidateQueries({
        queryKey: ["all-employees-status"],
      });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateEmployee,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleUpdateEmploymentStatus = () => {
    function handleCreateEmployee({
      data,
      id,
    }: {
      data: z.infer<typeof employmentStatusSchema>;
      id: number;
    }): Promise<loginApiResponse> {
      return axios
        .put(`/employment-status/${id}`, data)
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Employment Status Created Successfully");
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateEmployee,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useFetchSingleEmployee = (id: string) => {
    function fetchAllEmployeeRequest(): Promise<employeeType> {
      return axios.get(`/user/${id}`).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllEmployeeRequest,
      queryKey: [`all-employees`, id],
      retry: 0,
    });
  };
  const useHandleCreateNewEmployee = () => {
    const router = useRouter();
    function handleCreateEmployee(data: any): Promise<loginApiResponse> {
      return axios.post("/user/register", data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("User Created Successfully");
      router.push("/hr/view-employees");
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateEmployee,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleDeleteEmploymentStatus = () => {
    const queryClient = useQueryClient();
    function handleDeleteDesignation(id: string): Promise<loginApiResponse> {
      return axios
        .delete(`/employment-status/single/${id}`)
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Employment Status Deleted Successfully");
      await queryClient.invalidateQueries({
        queryKey: ["all-employees-status"],
      });
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
  const useHandleUpdateEmployee = (id: number) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    function handleCreateEmployee(data: any): Promise<loginApiResponse> {
      return axios.put(`/user/${id}`, data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("User Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["all-employees"] });
      revalidateServer("employee");
      const user = tokenService.getUser();
      if (id === Number(user?.id)) {
        tokenService.updateUser("image", response.image);
      }
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateEmployee,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleUploadEmployeeCSV = () => {
    function handleCreateEmployee(data: {
      file: File;
    }): Promise<loginApiResponse> {
      const formData = new FormData();
      formData.append("file", data.file);
      return axios.post("/upload/csv", formData).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Employees Added Successfully");
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateEmployee,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleAddEmployeeEducation = () => {
    function handleCreateEmployee(
      data: z.infer<typeof educationFormSchema>,
    ): Promise<loginApiResponse> {
      return axios.post("/education", data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Education History Updated");
      revalidateServer("employee");
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateEmployee,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleAddEmployeeDesignation = () => {
    function handleCreateEmployee(
      data: z.infer<typeof designationFormSchema>,
    ): Promise<loginApiResponse> {
      return axios.post("/designation-history", data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Designation History Updated");
      revalidateServer("employee");
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateEmployee,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  return {
    useFetchAllEmployees,
    useHandleUploadEmployeeCSV,
    useFetchAllEmploymentStatus,
    useFetchSingleEmployee,
    useHandleCreateNewEmployee,
    useHandleAddEmployeeEducation,
    useFetchInfiniteEmployees,
    useHandleUpdateEmployee,
    useHandleAddEmployeeDesignation,
    useHandleCreateEmploymentStatus,
    useHandleDeleteEmploymentStatus,
  };
};
export default EmployeeService;
