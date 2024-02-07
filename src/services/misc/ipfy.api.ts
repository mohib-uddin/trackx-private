import serverFetch from "@/_utils/config/server-fetch";
import { employeeType } from "@/_utils/types/employees";

export function fetchIPAddress(): Promise<employeeType> {
  return serverFetch(
    `https://api.ipify.org?format=json`,
    ["ip-address"],
    3600,
    true,
  );
}
