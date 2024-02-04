import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import {
  employeeType,
  fetchAllEmployeeApiResponse,
  fetchAllEmploymentStatusApiResponse,
} from "@/_utils/types/employees";
import TokenService from "@/services/token/token.service";

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
  const useFetchAllEmploymentStatus = (status: boolean) => {
    function fetchAllEmployeeRequest(): Promise<fetchAllEmploymentStatusApiResponse> {
      return axios
        .get(`/employment-status?status=${status}`)
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

  return {
    useFetchAllEmployees,
    useFetchAllEmploymentStatus,
    useFetchSingleEmployee,
    useHandleCreateNewEmployee,
  };
};
export default EmployeeService;
