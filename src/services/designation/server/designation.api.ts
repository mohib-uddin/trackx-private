import serverFetch from "@/_utils/config/server-fetch";
import { fetchSingleDesignation } from "@/_utils/types/designation";

export function fetchEmployeeByDesignation(
  id: string,
): Promise<fetchSingleDesignation> {
  return serverFetch(`/designation/${id}`, ["designation-employee", id]);
}
