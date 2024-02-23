import "@/styles/globals.css";

import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Toaster } from "sonner";

import InterceptorInitialization from "@/_utils/config/interceptor-initialization";
import NextUiProvider from "@/providers/next-ui-provider";
import ReactQueryProvider from "@/providers/react-query-provider";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "TrackX",
  description: "Welcome To TrackX",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body className={lato.className + " bg-[#F1F5F9]"}>
        <ReactQueryProvider>
          <InterceptorInitialization />
          <NextUiProvider>{children}</NextUiProvider>
        </ReactQueryProvider>
        <Toaster position={"top-center"} richColors={true} />
      </body>
    </html>
  );
}
