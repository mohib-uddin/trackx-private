import serverFetch from "@/_utils/config/server-fetch";
import { singleLeaveType } from "@/_utils/types/leave";

export function fetchSingleLeave(id: string): Promise<singleLeaveType> {
  return serverFetch(`/leave-application/single/${id}`, [
    "leave-application",
    id,
  ]);
}
