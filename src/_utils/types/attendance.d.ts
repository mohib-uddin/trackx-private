export type clockInType = {
  userId: string;
  comment: string;
  ip: string;
  file: string | null;
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

export type PunchBy = {
  id: number;
  firstName: string;
  lastName: string;
};

export type User = {
  firstName: string;
  lastName: string;
};

export type attendanceType = {
  id: number;
  userId: number;
  inTime: string;
  outTime: string;
  ip: string;
  comment: string;
  punchBy: PunchBy[];
  totalHour: number;
  inTimeStatus: string;
  outTimeStatus: string;
  image: string | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
};

export type fetchAllAttendanceApiResponse = {
  message: string;
  data: Attendance[];
  page: string;
  limit: string;
  total: number;
  lastPage: number;
};
