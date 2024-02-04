"use server";

import { cookies } from "next/headers";

import { cookieAuth } from "@/_utils/constants";

export const setServerCookiesService = async (access_token: string) => {
  cookies().set(cookieAuth, access_token);
};
