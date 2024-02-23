import serverFetch from "@/_utils/config/server-fetch";

export function fetchIPAddress(): Promise<{ ip: string }> {
  return serverFetch(
    `https://api.ipify.org?format=json`,
    ["ip-address"],
    3600,
    true,
  );
}
