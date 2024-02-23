import Image from "next/image";

import LoginAsset from "../../../public/login-vector.svg";
import Logo from "../../../public/logo.png";

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
      <Image
        width={800}
        height={800}
        quality={100}
        src={LoginAsset}
        alt={"Login"}
        className={"w-[600px]  xl:w-[800px] "}
      />
      <main className="w-full flex flex-col items-center justify-center max-w-[500px]">
        {/*<Image*/}
        {/*  src={Logo}*/}
        {/*  alt={"TrackX"}*/}
        {/*  fill={true}*/}
        {/*  width={300}*/}
        {/*  className={"h-40"}*/}
        {/*  quality={100}*/}
        {/*/>*/}
        <section className="h-full w-full flex items-center justify-center ">
          {children}
        </section>
      </main>
    </div>
  );
}
