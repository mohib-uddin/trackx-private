export type payrollFieldsType = {
  bonus: number;
  bonusComment: string;
  deduction: number;
  deductionComment: string;
  hourlySalary: number;
  monthlyHoliday: number;
  monthlyWorkHour: number;
  paidLeave: number;
  publicHoliday: number;
  salary: number;
  salaryMonth: number;
  salaryPayable: number;
  salaryYear: number;
  shiftWiseWorkHour: number;
  totalPayable: number;
  unpaidLeave: number;
  userId: number;
  workDay: number;
  workingHour: number;
};

export type payrollDetailsType = {
  id: number;
  firstName: string;
  lastName: string;
  salaryMonth: number;
  salaryYear: number;
  salary: number;
  paidLeave: number;
  unpaidLeave: number;
  monthlyHoliday: number;
  publicHoliday: number;
  workDay: number;
  shiftWiseWorkHour: number;
  monthlyWorkHour: number;
  hourlySalary: number;
  bonus: number;
  bonusComment: string;
  deduction: number;
  deductionComment: string;
  totalPayable: number;
  workingHour: number;
  salaryPayable: number;
};
export interface payslipType extends payrollFieldsType {
  user: {
    firstName: string;
    lastName: string;
    id: number;
  };
  createdAt: string;
  updatedAt: string;
  paymentStatus: string;
  userId: number;
}
export type fetchAlPayslipsTypeApiResponse = {
  data: payslipType;
  message: string;
  page: number;
  total: number;
  lastPage: number;
};

export type fetchPayrollDetailsApiResponse = {
  message: string;
  data: payrollDetailsType[];
};
export type makePaymentFormType = {
  value: string;
  paymentStatus: string;
  salaryMonth: string;
  salaryYear: string;
  id: string;
};

export type earningType = {
  name: string;
  earningType: string;
  calculationType: CALCULATION_TYPE;
  amount: number;
};
