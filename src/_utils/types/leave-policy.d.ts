import { employeeType } from "@/_utils/types/employees";

export type leavePolicyType = {
  id: string;
  name: string;
  paidLeaveCount: number;
  unpaidLeaveCount: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  user: employeeType[];
};

export type fetchAllLeavePoliciesApiResponse = leavePolicyType[];
