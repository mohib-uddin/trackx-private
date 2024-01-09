import { API_BASEURL } from "@/_utils/constants";

export default async function serverFetch<T>(
  url: string,
  tags: string[],
  revalidate?: number,
): Promise<T> {
  const { headers } = await import("next/headers");
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");

  const res = await fetch(`${API_BASEURL}${url}`, {
    headers: { authorization: `Bearer ${authorization}` },
    next: { tags: tags, revalidate: revalidate || 3600 },
  });
  return (await res.json()) as T;
}
