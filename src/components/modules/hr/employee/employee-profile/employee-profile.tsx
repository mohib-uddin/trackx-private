"use client";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

import { employeeType } from "@/_utils/types/employees";
import BaseTabs from "@/components/common/tabs/base-tabs";
import EmployeeInformationSection from "@/components/modules/hr/employee/employee-profile/employee-information-section";
import EmployeeSkillsSection from "@/components/modules/hr/employee/employee-profile/employee-skills-section";

const EmployeeProfile = ({ employeeData }: { employeeData: employeeType }) => {
  console.log(employeeData);
  const tabs = [
    {
      title: "Information",
      children: <EmployeeInformationSection employeeData={employeeData} />,
    },
    {
      title: "Skills",
      children: <EmployeeSkillsSection employeeData={employeeData} />,
    },
  ];

  return (
    <div>
      <Card className={"bg-primary text-white w-1/2"}>
        <CardBody
          className={"h-[20vh] flex flex-col justify-center items-center"}
        >
          <Avatar
            size={"lg"}
            isBordered={true}
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          ></Avatar>
          <h2
            className={"mt-2 font-[700] text-xl"}
          >{`${(employeeData?.firstName + " " + employeeData?.lastName).toUpperCase()}`}</h2>
          <p className={"text-gray-300"}>Associate Software Engineer</p>
        </CardBody>
      </Card>
      <div className={"mt-6"}>
        <BaseTabs tabs={tabs} />
      </div>
    </div>
  );
};
export default EmployeeProfile;
