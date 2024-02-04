import serverFetch from "@/_utils/config/server-fetch";
import { fetchEmployeeByDesignation } from "@/_utils/types/designation";

export function fetchEmployeeByDesignation(
  id: string,
): Promise<fetchEmployeeByDesignation> {
  return serverFetch(`/designation/employee/${id}`, [
    "designation-employee",
    id,
  ]);
}
