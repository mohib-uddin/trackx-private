"use client";
import BaseTabs from "@/components/common/tabs/base-tabs";
import Deductions from "@/components/modules/payroll/salary-components/deductions";
import Earnings from "@/components/modules/payroll/salary-components/earnings";
import Reimbursements from "@/components/modules/payroll/salary-components/reimbursements";

const ManageSalaryComponents = () => {
  const tabs = [
    {
      title: "Earnings",
      children: <Earnings />,
    },
    {
      title: "Deductions",
      children: <Deductions />,
    },
    {
      title: "Reimbursements",
      children: <Reimbursements />,
    },
  ];

  return (
    <div className={"mt-6"}>
      <BaseTabs color={"primary"} variant={"underlined"} tabs={tabs} />
    </div>
  );
};
export default ManageSalaryComponents;
