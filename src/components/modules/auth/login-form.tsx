"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
import AuthServices from "@/services/auth/client/auth.service";
// import useClientRouterPrefetch from "@/hooks/use-client-router-prefetch";

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
  // useClientRouterPrefetch(['/home']);
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
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
      <div className="w-full flex justify-end">
        <Link
          href={"/forgot-password"}
          className="text-[10px] text-darkBlue py-2.5 md:text-xs 2xl:text-sm"
        >
          Forgot Password?
        </Link>
      </div>
      <BaseButton isLoading={isLoginDataPending} type="submit">
        {`Login`}
      </BaseButton>
      <p className="flex items-center justify-center text-center gap-1 pt-5 text-xs  md:text-sm 2xl:text-base">
        <span className="text-black2">New to Taskii?</span>
        <Link href={"/signup"} className="text-darkBlue">
          Register
        </Link>
      </p>
    </form>
  );
}
