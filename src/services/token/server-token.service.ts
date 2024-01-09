import { cookies } from "next/headers";

import { cookieAuth, cookieRefresh, cookieUserData } from "@/_utils/constants";

class ServerTokenService {
  getLocalAccessToken = () => {
    return cookies().get(cookieAuth)?.value;
  };
  getLocalRefreshToken = () => {
    return cookies().get(cookieRefresh)?.value;
  };
  getUser = (): any => {
    return JSON.parse(cookies().get(cookieUserData)?.value as string);
  };
}
export default new ServerTokenService();
