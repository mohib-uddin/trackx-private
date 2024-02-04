import { employeeType } from "@/_utils/types/employees";

export type departmentType = {
  id: string;
  name: string;
  status: boolean;
  user: employeeType[];
  createdAt: string;
};

export type fetchAllDepartmentsApiResponse = {
  data: departmentType[];
  lastPage: number;
  total: number;
  page: number;
};

export type fetchEmployeeByDepartment = {
  id: number;
  name: string;
  status: boolean;
  user: employeeType[];
};
