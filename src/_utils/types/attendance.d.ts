export type clockInType = {
  userId: string;
  comment: string;
  ip: string;
};

export type checkInStatusType = {
  message: string;
  data: {
    id: number;
    userId: number;
    inTime: string;
    outTime: string | null;
    ip: string;
    comment: string;
    punchBy: number;
    totalHour: number | null;
    inTimeStatus: string;
    outTimeStatus: string | null;
    image: File | null;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
