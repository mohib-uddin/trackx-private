export type shiftType = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  workHour: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type fetchAllShiftsApiResponse = shiftType[];
