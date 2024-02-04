import { employeeType } from "@/_utils/types/employees";

export type designationType = {
  id: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};
export type fetchAllDesignationApiResponse = {
  data: designationType[];
  page: number;
  lastPage: number;
  total: number;
};
export type fetchEmployeeByDesignation = {
  designationId: string;
  designationName: string;
  employee: employeeType[];
};
