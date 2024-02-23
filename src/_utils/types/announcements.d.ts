export type fetchAllAnnouncementType = {
  message: string;
  data: {
    title: string;
    description: string;
    id: string;
  }[];
  lastPage: number;
  total: number;
};
