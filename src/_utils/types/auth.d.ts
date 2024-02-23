import { PERMISSIONS } from "@/_utils/enums";

export type userDataType = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  joinDate: string;
  leaveDate: string;
  employeeId: string;
  bloodGroup: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  token: string;
  departmentId: number;
  avatar: string;
};

export type loginApiResponse = userDataType;

export type userPermissionsApiResponse = {
  message: string;
  data: PERMISSIONS[];
};
