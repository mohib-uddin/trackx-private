"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
import useClientRouterPrefetch from "@/hooks/use-client-router-prefetch";
import AuthServices from "@/services/auth/client/auth.service";

type loginFormType = {
  userName: string;
  password: string;
};
export default function LoginForm() {
  const { handleSubmit, control } = useForm<loginFormType>();
  const { useHandleLoginInService } = AuthServices();
  const { mutate: handleLogin, isPending: isLoginDataPending } =
    useHandleLoginInService();
  const onSubmit = (data: loginFormType) => {
    handleLogin(data);
  };
  useClientRouterPrefetch(["/dashboard"]);
  return (
    <form className="flex  w-full flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 w-full">
        <BaseInput
          type="text"
          control={control}
          name="userName"
          label="Username"
          placeholder="Enter your Username"
          rules={{
            required: "Username is required",
          }}
        />
        <BaseInput
          type="password"
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          rules={{
            required: "Password is required",
          }}
        />
      </div>
      <Link className={"text-primary mt-3 text-sm"} href={"/forgot-password"}>
        Forgot Password?
      </Link>
      <BaseButton
        extraClass={"mt-6"}
        isLoading={isLoginDataPending}
        type="submit"
      >
        {`Login`}
      </BaseButton>
    </form>
  );
}
