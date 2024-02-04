import serverFetch from "@/_utils/config/server-fetch";
import { userPermissionsApiResponse } from "@/_utils/types";

export function fetchUserPermissions(): Promise<userPermissionsApiResponse> {
  return serverFetch(`/user/get-permissions`, ["permissions"]);
}
