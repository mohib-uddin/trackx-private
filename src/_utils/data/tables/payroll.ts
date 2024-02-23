export type renderLeavesType = {
  id: number;
  name: string;
  salary: number;
  salaryPayable: string;
  leaveTo: string;
  leaveDuration: string;
  bonus: string;
  bonusComment: string;
  deduction: string;
  deductionComment: string;
  workingHour: string;
  totalPayable: string;
  actions: React.ReactNode;
};
export interface renderPaySlipColsType extends renderLeavesType {
  salaryStatus: string;
  salaryMonth: string;
  salaryYear: string;
}
type employeeColumnsType = {
  name: string;
  uid: keyof renderLeavesType;
};
type payslipColsType = {
  name: string;
  uid: keyof renderPaySlipColsType;
};
export const PAYROLL_DETAILS_COLS: employeeColumnsType[] = [
  {
    name: "ID",
    uid: "id",
  },
  {
    name: "Name",
    uid: "name",
  },
  {
    name: "Salary",
    uid: "salary",
  },
  {
    name: "Salary Payable",
    uid: "salaryPayable",
  },
  {
    name: "Bonus",
    uid: "bonus",
  },
  {
    name: "B-Comment",
    uid: "bonusComment",
  },
  {
    name: "Deduction",
    uid: "deduction",
  },
  {
    name: "D-Comment",
    uid: "deductionComment",
  },
  {
    name: "Working Hours",
    uid: "workingHour",
  },
  {
    name: "Total Payable",
    uid: "totalPayable",
  },
  {
    name: "Actions",
    uid: "actions",
  },
];

export const PAYSLIP_COLS: payslipColsType[] = [
  {
    name: "ID",
    uid: "id",
  },
  {
    name: "Name",
    uid: "name",
  },
  {
    name: "Salary",
    uid: "salary",
  },
  {
    name: "Salary Payable",
    uid: "salaryPayable",
  },
  {
    name: "Bonus",
    uid: "bonus",
  },
  {
    name: "B-Comment",
    uid: "bonusComment",
  },
  {
    name: "Deduction",
    uid: "deduction",
  },
  {
    name: "D-Comment",
    uid: "deductionComment",
  },
  {
    name: "W Hours",
    uid: "workingHour",
  },
  {
    name: "Total",
    uid: "totalPayable",
  },
  {
    name: "Status",
    uid: "salaryStatus",
  },
  {
    name: "Month",
    uid: "salaryMonth",
  },
  {
    name: "Year",
    uid: "salaryYear",
  },
  {
    name: "Actions",
    uid: "actions",
  },
];

export const leaveStatusColorMap: leaveStatusColorMapType = {
  ACCEPTED: "success",
  REJECTED: "danger",
  PENDING: "warning",
};

export type leaveStatusColorMapType = {
  [key: string]: "success" | "danger" | "warning";
  ACCEPTED: "success" | "danger" | "warning";
  REJECTED: "success" | "danger" | "warning";
  PENDING: "success" | "danger" | "warning";
};
