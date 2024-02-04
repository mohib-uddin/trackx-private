import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-6 pt-10 pb-10 min-h-[calc(100vh-31px)] md:min-h-[calc(100vh-32px)] flex flex-col items-center justify-center max-w-[500px] mx-auto md:pt-28 2xl:pt-40">
      <Image
        src={"/logo.png"}
        alt={"Taskii"}
        width={85}
        height={34}
        quality={100}
        className="md:w-40 md:h-14"
      />
      <section className="h-full w-full flex items-center justify-center grow">
        {children}
      </section>
    </main>
  );
}
