import LoginAsset from "../../../public/login-vector.svg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "w-full flex flex-col md:flex-row justify-center items-center bg-white h-[100vh]"
      }
    >
      <div className={"w-full md:w-[600px]  xl:w-[800px] "}>
        <LoginAsset />
      </div>

      <main className="w-full flex flex-col items-center justify-center max-w-[500px]">
        <section className="h-full w-4/5 md:w-full flex items-center justify-center ">
          {children}
        </section>
      </main>
    </div>
  );
}
