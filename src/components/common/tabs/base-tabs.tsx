import { Tab, Tabs } from "@nextui-org/tabs";
import React from "react";

interface Props {
  tabs: {
    title: string;
    children: React.ReactNode;
  }[];
}
export default function BaseTabs({ tabs }: Props) {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        {tabs.map((el, index) => (
          <Tab key={index} title={el.title}>
            {el.children}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
