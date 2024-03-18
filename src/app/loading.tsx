import Image from "next/image";

import Logo from "../../public/logo.png";

export default function Loading() {
  return (
    <section className="bg-[rgba(238,238,238,0.6)] h-screen w-full absolute left-0 top-0 flex items-center justify-center z-10">
      <div className="absolute left-[calc(50% - 4em)] top-[calc(50% - 4em)] transition-opacity z-10">
        <div className="animate-spin border-2 border-[rgba(0, 0, 0, 0.2)] border-l-[17.6px] border-l-color-3 w-28 h-28  md:w-40 md:h-40 rounded-full" />
        <div className="z-10 flex items-center justify-center h-full w-[50%] absolute top-0 translate-x-[50%] translate-y-0">
          <Image src={Logo} alt={"Lane Love"} width={150} height={150} />
        </div>
      </div>
    </section>
  );
}
