import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import { fetchAllAnnouncementType } from "@/_utils/types/announcements";
import { announcementFormSchema } from "@/components/modules/announcements";

const DesignationService = () => {
  const useFetchAllAnnouncements = (page: number) => {
    function fetchAllAnnouncements(): Promise<fetchAllAnnouncementType> {
      let url = `/announcement/all?page=${page}&limit=10`;
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllAnnouncements,
      queryKey: [`announcements`, page],
      retry: 0,
    });
  };
  const useFetchAnnouncementsByDepartment = (
    page: number,
    departmentId: number,
  ) => {
    function fetchAllAnnouncements(): Promise<fetchAllAnnouncementType> {
      let url = `/announcement/by-department?page=${page}&limit=10&departmentId=${departmentId}`;
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllAnnouncements,
      queryKey: [`announcements`, page, departmentId],
      retry: 0,
    });
  };
  const useHandleCreateAnnouncement = () => {
    const queryClient = useQueryClient();
    function handleCreateDesignation(
      data: z.infer<typeof announcementFormSchema>,
    ) {
      return axios.post("/announcement", data).then((res) => res.data);
    }
    const onSuccess = async () => {
      toast.success("Announcement Created Successfully");
      await queryClient.invalidateQueries({ queryKey: ["announcements"] });
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

  const useHandleDeleteAnnouncement = () => {
    const queryClient = useQueryClient();
    function handleDeleteDesignation(id: string): Promise<loginApiResponse> {
      return axios.delete(`/announcement/single/${id}`).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      toast.success("Announcement Deleted Successfully");
      await queryClient.invalidateQueries({ queryKey: ["announcements"] });
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
      id: string;
    }): Promise<loginApiResponse> {
      return axios
        .put(`/designation/${data.id}`, { name: data.name })
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
    useFetchAllAnnouncements,
    useHandleCreateAnnouncement,
    useHandleDeleteAnnouncement,
    useFetchAnnouncementsByDepartment,
  };
};
export default DesignationService;
