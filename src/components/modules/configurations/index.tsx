"use client";
import { Tab, Tabs } from "@nextui-org/tabs";

import PayslipConfig from "@/components/modules/configurations/payslip-config";

const Configurations = () => {
  const options = [
    {
      title: "PaySlip",
      children: <PayslipConfig />,
    },
    {
      title: "PaySlip",
      children: <PayslipConfig />,
    },
    {
      title: "PaySlip",
      children: <PayslipConfig />,
    },
  ];
  return (
    <div className="flex w-full flex-col">
      <Tabs color={"primary"} aria-label="Options">
        {options.map((el, index) => {
          return (
            <Tab className={`text-white`} key={index} title={el.title}>
              {el.children}
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};
export default Configurations;
