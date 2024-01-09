"use client";
import Cookies from "js-cookie";

import {
  cookieAuth,
  cookieRefresh,
  cookieUserData,
  tokenRetries,
} from "@/_utils/constants";
import { userDataType } from "@/_utils/types";

class TokenService {
  getLocalAccessToken = () => {
    return Cookies.get(cookieAuth);
  };
  saveLocalAccessToken = (token: string) => {
    Cookies.set(cookieAuth, token, { sameSite: "strict" });
  };
  getLocalRefreshToken = () => {
    return Cookies.get(cookieRefresh);
  };
  saveLocalRefreshToken = (token: string) => {
    Cookies.set(cookieRefresh, token);
  };
  getUser = (): null | userDataType => {
    const userData = Cookies.get(cookieUserData);
    if (typeof window !== "undefined" && !!userData) {
      return JSON.parse(userData);
    }
    return null;
  };
  setUser = (user: userDataType) => {
    Cookies.set(cookieUserData, JSON.stringify(user));
  };
  updateUser = <T extends keyof userDataType>(
    key: T,
    value: userDataType[T],
  ) => {
    const userObject = this.getUser();
    if (userObject) {
      userObject[key] = value;
      this.setUser(userObject);
    } else {
      throw new Error("Error");
    }
  };
  setTokenRetries = (retries: number) => {
    Cookies.set(tokenRetries, retries.toString());
  };
  getTokenRetries = () => {
    return parseInt(Cookies.get(tokenRetries) || "");
  };
  clearStorage = () => {
    Cookies.remove(cookieAuth);
    Cookies.remove(cookieUserData);
    Cookies.remove(tokenRetries);
  };
}
export default new TokenService();
