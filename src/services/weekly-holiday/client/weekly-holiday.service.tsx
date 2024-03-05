import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import { fetchWeeklyHolidayApiResponse } from "@/_utils/types/weekly-holiday";
import {
  editPublicHolidayFormType,
  publicHolidayFormType,
} from "@/components/modules/policies/holiday/public-holiday";
import {
  editWeeklyHolidayFormType,
  weeklyHolidayFormType,
} from "@/components/modules/policies/holiday/weekly-holiday";

const WeeklyHolidayService = () => {
  const useFetchAllWeeklyHolidays = (query: string, page: number) => {
    function fetchAllHolidays(): Promise<fetchWeeklyHolidayApiResponse> {
      return axios
        .get(`/weekly-holiday/all?page=${page ?? 1}&limit=100&query=${query}`)
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllHolidays,
      queryKey: [`weekly-holiday`, query],
      retry: 0,
    });
  };
  const useFetchAllPublicHolidays = (query: string, page: number) => {
    function fetchAllHolidays(): Promise<fetchWeeklyHolidayApiResponse> {
      return axios
        .get(`/public-holiday/all?page=${page ?? 1}&limit=100&query=${query}`)
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllHolidays,
      queryKey: [`public-holiday`, query],
      retry: 0,
    });
  };
  const useHandleCreateWeeklyHoliday = () => {
    const queryClient = useQueryClient();
    function handleCreateLeavePolicy(
      data: weeklyHolidayFormType,
    ): Promise<any> {
      return axios.post("/weekly-holiday", data).then((res) => res.data);
    }
    const onSuccess = async () => {
      toast.success("Weekly Holiday Created Successfully");
      await queryClient.invalidateQueries({ queryKey: ["weekly-holiday"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateLeavePolicy,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleCreatePublicHoliday = () => {
    const queryClient = useQueryClient();
    function handleCreateLeavePolicy(
      data: publicHolidayFormType,
    ): Promise<any> {
      return axios.post("/public-holiday", data).then((res) => res.data);
    }
    const onSuccess = async () => {
      toast.success("Public Holiday Created Successfully");
      await queryClient.invalidateQueries({ queryKey: ["public-holiday"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateLeavePolicy,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleUpdateWeeklyHoliday = () => {
    const queryClient = useQueryClient();
    function handleCreateLeavePolicy(
      data: editWeeklyHolidayFormType,
    ): Promise<any> {
      return axios
        .put(`/weekly-holiday/${data.id}`, data)
        .then((res) => res.data);
    }
    const onSuccess = async () => {
      toast.success("Weekly Holiday Updated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["weekly-holiday"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateLeavePolicy,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleUpdatePublicHoliday = () => {
    const queryClient = useQueryClient();
    function handleCreateLeavePolicy(
      data: editPublicHolidayFormType,
    ): Promise<any> {
      return axios
        .put(`/public-holiday/${data.id}`, data)
        .then((res) => res.data);
    }
    const onSuccess = async () => {
      toast.success("Public Holiday Updated Successfully");
      await queryClient.invalidateQueries({ queryKey: ["public-holiday"] });
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleCreateLeavePolicy,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleDeleteWeeklyHoliday = () => {
    const queryClient = useQueryClient();
    function handleDeleteDesignation(id: string): Promise<loginApiResponse> {
      return axios
        .delete(`/weekly-holiday/single/${id}`)
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Weekly Holiday Deleted Successfully");
      await queryClient.invalidateQueries({ queryKey: ["weekly-holiday"] });
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
  const useHandleDeletePublicHoliday = () => {
    const queryClient = useQueryClient();
    function handleDeleteDesignation(id: string): Promise<loginApiResponse> {
      return axios
        .delete(`/weekly-holiday/single/${id}`)
        .then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Weekly Holiday Deleted Successfully");
      await queryClient.invalidateQueries({ queryKey: ["weekly-holiday"] });
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
  return {
    useFetchAllWeeklyHolidays,
    useHandleDeleteWeeklyHoliday,
    useHandleCreateWeeklyHoliday,
    useHandleUpdateWeeklyHoliday,
    useHandleCreatePublicHoliday,
    useHandleDeletePublicHoliday,
    useHandleUpdatePublicHoliday,
    useFetchAllPublicHolidays,
  };
};
export default WeeklyHolidayService;
