import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
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
import { educationFormSchema } from "@/components/modules/hr/employee/employee-profile/employee-skills-section";

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
      let url = `/user/get-all?status=${status}&page=${pageParam}&limit=5`;
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
  const useFetchAllEmploymentStatus = (status: boolean) => {
    function fetchAllEmployeeRequest(): Promise<fetchAllEmploymentStatusApiResponse> {
      return axios
        .get(`/employment-status/all?status=${status}&page=1&limit=100`)
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllEmployeeRequest,
      queryKey: [`all-employees-status`, status],
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

  return {
    useFetchAllEmployees,
    useFetchAllEmploymentStatus,
    useFetchSingleEmployee,
    useHandleCreateNewEmployee,
    useHandleAddEmployeeEducation,
    useFetchInfiniteEmployees,
  };
};
export default EmployeeService;
