"use client";

import { NextUIProvider } from "@nextui-org/system";

interface Props {
  children: React.ReactNode;
}
export default function NextUiProvider({ children }: Props) {
  // 2. Wrap NextUIProvider at the root of your app
  return <NextUIProvider>{children}</NextUIProvider>;
}
