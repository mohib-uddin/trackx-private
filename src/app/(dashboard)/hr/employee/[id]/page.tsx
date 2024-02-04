import { notFound } from "next/navigation";

import EmployeeProfile from "@/components/modules/hr/employee/employee-profile/employee-profile";
import { fetchSingleEmployee } from "@/services/employees/server/employee.api";

const EmployeePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const employeeData = await fetchSingleEmployee(id);
  if (!id || !employeeData) {
    notFound();
  }
  return <EmployeeProfile employeeData={employeeData} />;
};
export default EmployeePage;