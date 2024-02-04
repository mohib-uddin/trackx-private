import serverFetch from "@/_utils/config/server-fetch";
import { employeeType } from "@/_utils/types/employees";

export function fetchSingleEmployee(id: string): Promise<employeeType> {
  return serverFetch(`/user/get-single/${id}`, ["employee", id]);
}
