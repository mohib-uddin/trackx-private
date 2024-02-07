import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import axios from "@/_utils/config/axios-instance";
import { viewError } from "@/_utils/helpers";
import { errorType, loginApiResponse } from "@/_utils/types";
import TokenService from "@/services/token/token.service";

export default function AuthServices() {
  const useHandleLoginInService = () => {
    const router = useRouter();
    async function handleLogInRequest(data: any): Promise<loginApiResponse> {
      return axios.post("/user/login", data).then((res) => res.data);
    }
    const onSuccess = async (response: loginApiResponse) => {
      console.log(response);
      TokenService.setUser(response);
      TokenService.setTokenRetries(5);
      TokenService.saveLocalAccessToken(response.token);
      toast.success("Login Successful");
      router.push("/dashboard");
    };
    const onError = (error: errorType) => {
      toast.error(viewError(error));
    };

    return useMutation({
      mutationFn: handleLogInRequest,
      onError,
      onSuccess,
      retry: 0,
    });
  };

  return {
    useHandleLoginInService,
  };
}
