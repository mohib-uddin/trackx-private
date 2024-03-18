import { notFound } from "next/navigation";

import EmployeeProfile from "@/components/modules/hr/employee/employee-profile/employee-profile";
import { fetchUserPermissions } from "@/services/auth/auth.api";
import { fetchSingleEmployee } from "@/services/employees/server/employee.api";

const EmployeePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(id, "uid");
  const employeeData = await fetchSingleEmployee(id);
  console.log(employeeData, "asd");
  const permissions = await fetchUserPermissions();
  return (
    <EmployeeProfile permissions={permissions} employeeData={employeeData} />
  );
};
export default EmployeePage;
