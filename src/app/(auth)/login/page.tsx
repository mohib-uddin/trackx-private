import LoginForm from "@/components/modules/auth/login-form";

export default function Page() {
  return (
    <div className="w-full">
      <div className="mb-7 text-center">
        <h5 className="text-black2 pb-1 font-bold text-xl md:text-2xl 2xl:text-[30px] md:pb-2.5">
          Welcome Back!
        </h5>
        <p className="text-black2 text-xs md:text-base 2xl:text-lg">
          Please Login to your account
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
