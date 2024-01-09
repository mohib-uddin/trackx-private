"use server";

import { cookies } from "next/headers";

import { cookieAuth, cookieRefresh } from "@/_utils/constants";

export const setServerCookiesService = async (
  access_token: string,
  refresh_token: string,
) => {
  cookies().set(cookieAuth, access_token);
  cookies().set(cookieRefresh, refresh_token);
};
