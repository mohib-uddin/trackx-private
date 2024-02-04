import { employeeType } from "@/_utils/types/employees";

export type weeklyHolidayType = {
  id: string;
  name: string;
  startDay: string;
  endDay: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  user: employeeType[];
};

export type fetchWeeklyHolidayApiResponse = weeklyHolidayType[];
