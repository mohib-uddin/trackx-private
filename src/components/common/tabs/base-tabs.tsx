import { Tab, Tabs } from "@nextui-org/tabs";
import React from "react";

interface Props {
  tabs: {
    title: string;
    children: React.ReactNode;
  }[];
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  variant?: "solid" | "light" | "underlined" | "bordered" | undefined;
}
export default function BaseTabs({ tabs, color, variant }: Props) {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        variant={variant ?? "solid"}
        color={color ?? "default"}
        aria-label="Options"
      >
        {tabs.map((el, index) => (
          <Tab key={index} title={el.title}>
            {el.children}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
