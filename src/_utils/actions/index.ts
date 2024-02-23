"use server";

import { revalidateTag } from "next/cache";

export const revalidateServer = (tag: string) => {
  revalidateTag(tag);
};
