import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import {
  fetchAlPayslipsTypeApiResponse,
  fetchPayrollDetailsApiResponse,
  makePaymentFormType,
  payrollFieldsType,
} from "@/_utils/types/payroll";

const PayrollService = () => {
  const useFetchAllEmployeePayrollDetails = (
    salaryMonth: string,
    salaryYear: number,
  ) => {
    function fetchPayrollDetails(): Promise<fetchPayrollDetailsApiResponse> {
      let url = `/payroll?salaryMonth=${salaryMonth}&salaryYear=${salaryYear}`;
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchPayrollDetails,
      queryKey: [`payroll`, salaryMonth, salaryYear],
      retry: 0,
    });
  };
  const useFetchAllPaySlips = (
    salaryMonth: string,
    salaryYear: number,
    page: number,
  ) => {
    function fetchPayrollDetails(): Promise<fetchAlPayslipsTypeApiResponse> {
      let url = `/payroll/all?salaryMonth=${salaryMonth}&salaryYear=${salaryYear}&page=${page}&limit=10`;
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchPayrollDetails,
      queryKey: [`payslip`, salaryMonth, salaryYear, page],
      retry: 0,
    });
  };
  const useHandleCreatePayroll = () => {
    const queryClient = useQueryClient();
    function handleCreatePayroll(data: payrollFieldsType[]): Promise<any> {
      return axios
        .post(`/payroll`, { data: [...data] })
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Payroll Generated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["payslip"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreatePayroll,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleMakePayment = () => {
    const queryClient = useQueryClient();
    function handleMakePayment(data: makePaymentFormType): Promise<any> {
      return axios
        .put(`/payroll/payment/${data.id}`, data)
        .then((res) => res.data);
    }
    const onSuccess = async () => {
      toast.success("Payment Made Successfully");
      await queryClient.invalidateQueries({ queryKey: ["payslip"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleMakePayment,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  return {
    useFetchAllEmployeePayrollDetails,
    useHandleCreatePayroll,
    useFetchAllPaySlips,
    useHandleMakePayment,
  };
};
export default PayrollService;
