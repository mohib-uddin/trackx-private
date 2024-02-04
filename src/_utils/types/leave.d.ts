export type leaveType = {
  id: number;
  userId: number;
  leaveType: string;
  leaveFrom: string;
  leaveTo: string;
  acceptedLeaveFrom: string;
  acceptedLeaveTo: string;
  acceptedLeaveBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  leaveDuration: number;
  reason: string;
  reviewComment: string;
  attachment: File;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
};
export type fetchAllLeaveApiResponse = {
  data: leaveType[];
  page: number;
  total: number;
  lastPage: number;
};
