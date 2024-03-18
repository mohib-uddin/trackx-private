import { employeeType } from "@/_utils/types/employees";

export type designationType = {
  id: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  reportsTo: number;
};
export type fetchAllDesignationApiResponse = {
  data: designationType[];
  page: number;
  lastPage: number;
  total: number;
};
type designationUserType = {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  image?: string;
};

export type fetchSingleDesignation = {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  reportsTo: number | null;
  superior: {
    id: number;
    name: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    reportsTo: number | null;
    user: designationUserType[];
  };
  subordinates: {
    id: number;
    name: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    reportsTo: number;
    user: designationUserType[];
  }[];
  user: designationUserType[];
};
