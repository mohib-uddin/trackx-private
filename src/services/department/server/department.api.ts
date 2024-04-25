import serverFetch from "@/_utils/config/server-fetch";
// import { fetchEmployeeByDepartment } from "@/_utils/types/department";
// @ts-ignore
import { fetchEmployeeByDepartment } from "@/_utils/types/department";

export function fetchEmployeeByDepartment(
  id: string,
): Promise<fetchEmployeeByDepartment> {
  return serverFetch(`/department/${id}`, ["department-employee", id]);
}
