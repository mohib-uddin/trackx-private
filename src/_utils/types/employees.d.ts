export type employeeType = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string | null;
  phone: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  joinDate: string | null;
  leaveDate: string | null;
  employeeId: string | null;
  bloodGroup: string | null;
  image: string | null;
  employmentStatusId: number;
  departmentId: number;
  roleId: number;
  shiftId: number;
  leavePolicyId: number;
  weeklyHolidayId: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  designationHistory: any[]; // You might want to define types for these arrays
  salaryHistory: any[]; // You might want to define types for these arrays
  educations: any[]; // You might want to define types for these arrays
  employmentStatus: {
    id: number;
    name: string;
    colourValue: string;
    description: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
  department: {
    id: number;
    name: string;
    status: boolean;
  };
  role: {
    id: number;
    name: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
  shift: {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    workHour: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
  leavePolicy: {
    id: number;
    name: string;
    paidLeaveCount: number;
    unpaidLeaveCount: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
  weeklyHoliday: {
    id: number;
    name: string;
    startDay: string;
    endDay: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
  awardHistory: any[]; // You might want to define types for this array
  skill: string[];
};

export type fetchAllEmployeeApiResponse = {
  data: employeeType[];
};

export type employeeFormType = {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  joinDate: string;
  leaveDate: string;
  employeeId: string;
  bloodGroup: string;
  employmentStatusId: string;
  departmentId: string;
  roleId: string;
  shiftId: string;
  leavePolicyId: string;
  weeklyHolidayId: string;
  file: any;
  designationId: string;
  designationStartDate: string;
  designationEndDate: string;
  salary: number;
  salaryStartDate: string;
  salaryEndDate: string;
  salaryComment: string;
  skill: string[];
  education: {
    degree: string;
    institution: string;
    result: string;
    startDate: string;
    endDate: string;
    field: string;
  };
};

export type employmentStatusType = {
  id: string;
  name: string;
  colorValue: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type fetchAllEmploymentStatusApiResponse = {
  data: employmentStatusType[];
};
